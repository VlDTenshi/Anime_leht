const {db} = require('../db')
const Anime = db.Animes
/* const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.NAME,
    connectionLimit: 5
}) */

/* exports.getAll = async (req, res) => {
    const animes = await Anime.findAll({attributes:["name"]})
    console.log(animes);
    res.send(animes)
} */
exports.getAll = async (req, res) => {
    try {
        const animes = await Anime.findAll({ attributes: ["name","release","rating"] });
        res.send(animes); // Send the response as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get specific anime by id
exports.getById = async (req, res) => {
    const animes = await Anime.findByPk(req.params.id)
    if(animes === null){
        res.status(404).send({"error":"Anime not found"})
    }
    res.send(animes)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    // const anime = await Anime.create(req.body)
    let anime
    try{
        anime = await Anime.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid input"})
        } else {
            console.log("AnimesCreate ", error)
            res.status(500).send({"error":"Server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/animes/${anime.id}`)
        .json(anime)
}
exports.updateById = async (req, res) => {
    let result
    delete ( req.body.id)
    try{
        result = await Anime.update(req.body, {where: {id: req.params.id}})
    } catch (error) {
        console.log("AnimesUpdate: ", error)
        res.status(500).send({"error": "server error, try again later"})
        return
    }
    if(result === 0 || result === undefined) {
        res.status(404).send({"error":"Anime not found"})
        return
    }
    const anime = await Anime.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/animes/${anime.id}`)
        .json(anime)
}
exports.deleteById = async (req,res) => {
    let result
    try{
        result = await Anime.destroy ({where: {id: req.params.id}})
    } catch (error){
        console.log("AnimesCreateDelete ", error)
        res.status(500).send({"error":"server error, try again later"})
        return
    }
    if(result === 0 || result === undefined) {
        res.status(404).send({"error":"Anime not found"})
        return
    }
    res.status(204).send()
}
getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`
    )
}