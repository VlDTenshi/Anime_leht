require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()
const mariadb = require("mariadb")
const port = process.env.APP_PORT
/* console.log(process.env.APP_PORT);
console.log(process.env.HOST);
console.log(process.env.USER);
console.log(process.env.PASS);
console.log(process.env.NAME); */
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json())
app.use(cors())

/* const animes =[
    {id:1, Nimi:"Parasyte: Teaching about life", Ilmumiseaasta:2014, Reiting: 8.8},
    {id:2, Nimi:"Reach you", Ilmumiseaasta:2009, Reiting: 7.8},
    {id:3, Nimi:"Akame ga Kill", Ilmumiseaasta:2014, Reiting: 7.7},
    {id:4, Nimi:"Death note", Ilmumiseaasta:2006, Reiting: 8.6},
    {id:5, Nimi:"Elf song", Ilmumiseaasta:2004, Reiting: 7.9}
] */

require("./routes/app_routes")(app)

/* app.get("/animes", async(req, res)=>{
    let connection
    try{
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT id, name FROM animes")
        res.send(rows)
    } catch (error){
        throw error
    } finally {
        if(connection) return connection.end()
    }
}) */

app.get("/animes/:id", (req, res)=>{
    if(typeof animes[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Anime isn't found"})
    }
    res.send(animes[req.params.id - 1])
})
app.get("/mangas/:id", (req, res)=>{
    if(typeof manga[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Manga isn't found"})
    }
    res.send(manga[req.params.id - 1])
})
app.get("/users/:id", (req, res)=>{
    if(typeof user[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "User isn't found"})
    }
    res.send(user[req.params.id - 1])
})
app.post('/animes', (req, res)=>{
    if(!req.body.name || !req.body.release || !req.body.rating){
        return res.status(400).send({error: "One or all parameters are missing"})
    }
    let anime = {
        id: animes.length +1,
        name: req.body.name,
        release: req.body.release,
        rating: req.body.rating
    }
    animes.push(anime)

    res.status(201)
    .location(`${getBaseUrl(req)}/animes/${animes.length}`)
    .send(anime)
})
app.post('/mangas', (req, res)=>{
    if(!req.body.title || !req.body.author || !req.body.genre || !req.body.publication_year || !req.body.description || !req.body.cover_image_url || !req.body.rating){
        return res.status(400).send({error: "One or all parameters are missing"})
    }
    let manga = {
        id: mangas.length +1,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publication_year: req.body.publication_year,
        description: req.body.description,
        cover_image_url: req.body.cover_image_url,
        rating: req.body.rating
    }
    mangas.push(manga)

    res.status(201)
    .location(`${getBaseUrl(req)}/mangas/${mangas.length}`)
    .send(manga)
})
app.post('/users', (req, res)=>{
    if(!req.body.username || !req.body.email || !req.body.password){
        return res.status(400).send({error: "One or all parameters are missing"})
    }
    let user = {
        id: users.length +1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    users.push(user)

    res.status(201)
    .location(`${getBaseUrl(req)}/users/${users.length}`)
    .send(user)
})
app.delete("/animes/:id", (req, res)=>{
    if(typeof animes[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Animes are not found"})
    }
    animes.splice(req.params.id - 1, 1)
    res.status(204).send({error:"No Content"})
})
app.delete("/mangas/:id", (req, res)=>{
    if(typeof manga[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Manga are not found"})
    }
    manga.splice(req.params.id - 1, 1)
    res.status(204).send({error:"No Content"})
})
app.delete("/users/:id", (req, res)=>{
    if(typeof users[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Users are not found"})
    }
    users.splice(req.params.id - 1, 1)
    res.status(204).send({error:"No Content"})
})
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, async () => {console.log(`API up at: http://localhost:${port}`)})

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}