import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
          name
          born
          bookCount
        }
        genres
    }
`

export const ALL_BOOKS = gql`
    query allBooks( $author: String, $genre: String) {
              allBooks( author: $author, genre: $genre) {
                  title
                  published
                  author {
                    name
                    born
                    bookCount
                  }
                  genres
              }
    } 
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const CREATE_BOOK = gql`
  mutation createBook(  $title: String!, 
                        $published: Int!, 
                        $author: String!, 
                        $genres: [String!]) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
      id
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const MY_DATA = gql`
  query {
      me {
        username
        favoriteGenre
      }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`