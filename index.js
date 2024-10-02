import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine','ejs'); 
app.use(bodyParser.urlencoded({extended:true}));

let blogs = [];
let names = [];
app.get("/", (req, res) => {
  res.render("index.ejs");
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
