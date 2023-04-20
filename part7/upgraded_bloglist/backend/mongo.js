const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please, provide the password as an argument.');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://huugdd7yh:${password}@cluster0.21szclx.mongodb.net/personsApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: request.body.title,
  author: request.body.author,
  url: request.body.url,
  likes: request.body.likes,
})

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: request.body.title,
  author: request.body.author,
  url: request.body.url,
  likes: request.body.likes,
})


blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})

/*
Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})
*/