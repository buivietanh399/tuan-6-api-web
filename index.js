
const express = require('express');
const bodyParser = require('body-parser');
const Blog_20204709 = require('./models/blog_20204709');
const configViewEngine = require('./config/viewEngine');
const mongoose = require('mongoose');
const app = express();

//config req,res
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// config view engine
configViewEngine(app);


//config database

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority", { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));




// GET all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog_20204709.find();
    console.log(blogs);
    // res.json(blogs);
    res.render('index.ejs', {blogs: blogs});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new blog
app.post('/blogs', async (req, res) => {
  const blog = new Blog_20204709({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an  existing blog
app.put('/blogs/:id', async (req, res) => {
  try {
  const blog = await Blog_20204709.findById(req.params.id);
  if (!blog) throw new Error('Blog not found');
  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;

const updatedBlog = await blog.save();
res.json(updatedBlog);
} catch (err) {
  res.status(400).json({ message: err.message });
  }
  });
  
  // DELETE a blog
  app.delete('/blogs/:id', async (req, res) => {
  try {
  const deletedBlog = await Blog_20204709.findByIdAndDelete(req.params.id);
  if (!deletedBlog) throw new Error('Blog not found');
  res.json(deletedBlog);
  } catch (err) {
  res.status(400).json({ message: err.message });
  }
  });
  
  // Start the server
  app.listen(3000, () => {
  console.log(`listening on http://localhost:3000/blogs`);
  });
