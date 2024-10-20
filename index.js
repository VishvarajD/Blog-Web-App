const bodyParser = require("body-parser") ;
const express  = require("express") ;
const dotenv  = require('dotenv');
const params = require('params');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const port = 3211;
const collection = require('./SchemaModel.js')

app.use(express.static("public"));
app.set('view engine','ejs'); 
app.use(bodyParser.urlencoded({extended:true}));

// dotenv.config();
// //connecting database
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.mongo_url)
//         console.log(`DB Connected`);
        
//     } catch (error) {
//         console.log(`Error while connecting db ${error}`);
//       }
      
//     }
//     connectDB();
// created a schema 
// const tutSchema = new mongoose.Schema({
//   blogName:{
//     type:String,
//     required:true
//   },
//   blogContent:{
//     type:String,
//     required:true
//   },
//   blogImg:{
//     type:String,
//     required:true
//   }
// })
// //created a collection by 
// const collection = new mongoose.model('collect',tutSchema)
// data={
//  blogName: 'new',
//   blogContent:'new1',
//   blogImg:'new3'
// }
// collection.insertMany([data])



let blogs = [];
// let blogsinfo = [];
let names =[];
let images= [];
//for storing img
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/');  // Specify the directory for storing images
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  // Create unique file names
  }
});

// Initialize multer with the storage options
const upload = multer({ storage:storage });


app.get("/", (req, res) => {
  res.render("index.ejs",{imgP :'/images/world.jpg'});
});

app.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const newBlog1 = req.body.textarea;
  const newName1 = req.body.title;
  const newImage1 = req.body.image;
  images.push[newImage1];
  blogs.push[newBlog1];
  names.push[newName1];

  if (blogId >= 0 && blogId < blogs.length) {
      const blogContent = blogs[blogId];
      const BlogName = names[blogId];
      const blogImg = images[blogId];
      console.log(blogContent);
      
      res.render('readBlogs.ejs', {blog:blogContent,name1:BlogName,img1:blogImg,images});
  } else {
     res.status(404).send("Blog not found");
  }
});


app.get("/myBlogs", (req, res) => {
  res.render("myblogs.ejs",{blogs,names,images});
});

app.get("/writeBlogs", (req, res) => {
  res.render("writeBlogs.ejs");
});

app.get("/submit", (req, res) => {
  res.render("myblogs.ejs");
});

// upload.single('blogImage'),
app.post("/submit", upload.single('blogImage'), (req,res) => {
  console.log();
  

  const newBlog = req.body.textarea;
  let newTitle = req.body.title;
  const newImg = req.body.image;
  newTitle = newTitle.toUpperCase();
  images.push(newImg);
  names.push(newTitle);
  blogs.push(newBlog);
  // const tutSchema = new mongoose.Schema({
  //   blogName:{
  //     type:String,
  //     required:true
  //   },
  //   blogContent:{
  //     type:String,
  //     required:true
  //   },
  //   blogImg:{
  //     type:String,
  //     required:true
  //   }
  // })
  // //created a collection by 
  // const collection = new mongoose.model('collects',tutSchema)
  
  data={
    blogName: newTitle,
     blogContent:newBlog,
     blogImg:newImg
   }
  collection.insertMany([data])
  res.redirect('/myBlogs');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
