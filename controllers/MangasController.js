const {db} = require('../db')
const Manga = db.Mangas
exports.getAll = async (req, res) => {
    try {
        const mangas = await Manga.findAll({ attributes: ["title","author","genre","publication_year","description","cover_image_url","rating"] });
        res.send(mangas); // Send the response as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//get specific manga by id
exports.getById = async (req, res) => {
    const mangas = await Manga.findByPk(req.params.id)
    if(mangas === null){
        res.status(404).send({"error":"Manga not found"})
    }
    res.send(mangas)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    // const anime = await Anime.create(req.body)
    let manga
    try{
        manga = await Manga.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid input"})
        } else {
            console.log("MangasCreate ", error)
            res.status(500).send({"error":"Server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/mangas/${manga.id}`)
        .json(manga)
}
exports.updateById = async (req, res) => {
    let result
    delete ( req.body.id)
    try{
        result = await Manga.update(req.body, {where: {id: req.params.id}})
    } catch (error) {
        console.log("MangasUpdate: ", error)
        res.status(500).send({"error": "server error, try again later"})
        return
    }
    if(result === 0 || result === undefined) {
        res.status(404).send({"error":"Manga not found"})
        return
    }
    const manga = await Manga.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/animes/${manga.id}`)
        .json(manga)
}
exports.deleteById = async (req,res) => {
    let result
    try{
        result = await Manga.destroy ({where: {id: req.params.id}})
    } catch (error){
        console.log("MangasCreateDelete ", error)
        res.status(500).send({"error":"server error, try again later"})
        return
    }
    if(result === 0 || result === undefined) {
        res.status(404).send({"error":"Manga not found"})
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