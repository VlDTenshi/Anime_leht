const express = require('express')
const app = express;
const port = 8080;
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

const animes =[
    {id:1, name:"Parasyte: Teaching about life", Ilmumiseaasta:2014, rating: 8.8},
    {id:2, name:"Reach you", Ilmumiseaasta:2009, rating: 7.8},
    {id:3, name:"Akame ga Kill", Ilmumiseaasta:2014, rating: 7.7},
    {id:4, name:"Death note", Ilmumiseaasta:2006, rating: 8.6},
    {id:5, name:"Elf song", Ilmumiseaasta:2004, rating: 7.9}
]

app.get('/animes', (req, res)=>{
    res.send(animes)
})

app.get("/animes/:id", (req, res)=>{
    if(typeof animes[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Anime ei ole leitud"})
    }
    res.send(animes[req.params.id - 1])
})

app.get('/animes', (req, res)=>{
    animes.push({
        id: animes.length +1,
        name: req.body.name,
        Ilmumiseaasta: req.body.Ilmumiseaasta,
        rating: req.body.rating
    })
    res.end()
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, () => {console.log(`API up at: http://localhost:${port}`)})