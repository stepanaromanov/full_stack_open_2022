require("dotenv").config()
const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require("jsonwebtoken");
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => await Book.collection.countDocuments(),
      authorCount: async () => await Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (args.author && args.genre) {
          const author = await Author.findOne({ name: args.author })
          return Book.find({ $and: [
              { author: {$in: author.id} },
              { genres: {$in: args.genre} },
            ]}).populate('author')
        }
        if (args.genre) {
          return Book.find({ genres: {$in: args.genre } }).populate('author')
        }
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          return Book.find({ author: {$in: author.id} }).populate('author')
        }
        return Book.find({}).populate('author')
      },
      allAuthors: async (root, args) => {
        return Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Book: {
      title: (root) => root.title,
      published: (root) => root.published,
      author: (root) => root.author,
      id: (root) => root.id,
      genres: (root) => root.genres,
    },
    Author: {
      name: (root) => root.name,
      id: (root) => root.id,
      born: (root) => root.born,
      bookCount: async (root) => 
          await Book.countDocuments({ author: root })
    },
    Mutation: {
      addBook: async (root, args, context) => {
        if (!context.currentUser) {
          throw new GraphQLError('not authenticated')
        }
        try {
          let author = await Author.findOne({ name: args.author })
          let book = new Book({ ...args, author })
          await book.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        } catch (error) {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
      },
      editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new GraphQLError('not authenticated')
        }
        try {
          console.log(args)
          let author = await Author.findOne({ name: args.name })
          author.born = args.setBornTo
          await author.save()
          return author
        } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
      },
      createUser: async (root, args) => {
        try {
          const user = new User({ username: args.username })
          await user.save()
          return user
        } catch(error) {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if ( !user || args.password !== 'password' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          })        
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    }
}

module.exports = resolvers

/*
BACKED UP DATA

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky',
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz',
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
*/