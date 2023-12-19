const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080;
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json())
app.use(cors())
const animes =[
    {id:1, Nimi:"Parasyte: Teaching about life", Ilmumiseaasta:2014, Reiting: 8.8},
    {id:2, Nimi:"Reach you", Ilmumiseaasta:2009, Reiting: 7.8},
    {id:3, Nimi:"Akame ga Kill", Ilmumiseaasta:2014, Reiting: 7.7},
    {id:4, Nimi:"Death note", Ilmumiseaasta:2006, Reiting: 8.6},
    {id:5, Nimi:"Elf song", Ilmumiseaasta:2004, Reiting: 7.9}
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
    if(!req.body.Nimi || !req.body.Ilmumiseaasta || !req.body.Reiting){
        return res.status(400).send({error: "One or all parameters are missing"})
    }
    let anime = {
        id: animes.length +1,
        Nimi: req.body.Nimi,
        Ilmumiseaasta: req.body.Ilmumiseaasta,
        Reiting: req.body.Reiting
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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, () => {console.log(`API up at: http://localhost:${port}`)})

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 
    'http' + `://${req.headers.host}`
}