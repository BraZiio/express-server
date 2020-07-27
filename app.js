const express = require("express");
const path = require("path");

const axios = require('axios');
const app = express();
const host = "localhost";
const port = 3000;

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.get("/", (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((answer) => {
        let length = answer.data.length;
        let posts = (answer.data).slice(length-3,length);
        res.render('index.twig', {
            title: "Bienvenue sur mon site",
            posts: posts,
        }
      );
  });
})

app.get('/blog', (req, res) => {
    
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then((answer) => {
        posts = (answer.data);
        res.render('posts.twig', {
            posts: posts
        })
    })  
})

app.get('/blog/:id', (req, res) => {

    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then((answer) => {
        posts = (answer.data);
        res.render('post.twig', {
            posts: posts
        }
        )
    }) 
})

app.get('/services/:id', (req, res) => {
    console.log(req.params.id);
    res.send('Mes services');
})

app.listen(port, () => {
    console.log(`App listening on ${host}:${port}`);
})