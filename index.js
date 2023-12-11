const express = require('express')
const app = express()
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

app.get("/animes", (req, res)=>{
    res.send(animes)
})

app.get("/animes/:id", (req, res)=>{
    if(typeof animes[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Anime isn't found"})
    }
    res.send(animes[req.params.id - 1])
})

app.post('/animes', (req, res)=>{
    if(!req.body.name || !reqq.body.Ilmumiseaasta || !req.body.rating){
        return res.status(400).send({error: "One or all parameters are missing"})
    }
    let anime = {
        id: animes.length +1,
        name: req.body.name,
        Ilmumiseaasta: req.body.Ilmumiseaasta,
        rating: req.body.rating
    }
    animes.push(anime)

    res.status(201)
    .location(`${getBaseUrl(req)}/animes/${animes.length}`)
    .send(anime)
})

app.delete("/animes/:id", (req, res)=>{
    if(typeof animes[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Animes are not found"})
    }
    animes.splice(req.params.id - 1, 1)
    res.status(204).send({error:"No Content"})
})
app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, () => {console.log(`API up at: http://localhost:${port}`)})

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 
    'http' + `://${req.headers.host}`
}