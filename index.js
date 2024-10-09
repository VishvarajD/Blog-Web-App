const bodyParser = require("body-parser") ;
const express  = require("express") ;
const dotenv  = require('dotenv');
const mongoose = require('mongoose');
// const connectDB = require('./config/connectDB')


dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log(`DB Connected`);
        
    } catch (error) {
        console.log(`Error while connecting db ${error}`);
        
        
    }
    
}
connectDB()

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine','ejs'); 
app.use(bodyParser.urlencoded({extended:true}));

let blogs = [];
let names =[];
app.get("/", (req, res) => {
  res.render("index.ejs",{imgP :'/images/world.jpg'});
});



app.get("/myBlogs", (req, res) => {
  res.render("myblogs.ejs",{blogs,names});
});

app.get("/writeBlogs", (req, res) => {
  res.render("writeBlogs.ejs");
});

app.get("/submit", (req, res) => {
  res.render("myBlogs.ejs");
});

app.post("/submit" , (req,res) => {
  const newBlog = req.body.textarea;
  let newTitle = req.body.title;
  newTitle = newTitle.toUpperCase();
  names.push(newTitle);
  blogs.push(newBlog);
  res.redirect('/myBlogs');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
