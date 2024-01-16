const {db} = require('../db')
const User = db.Users
exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["username","email","password"] });
        res.send(users); // Send the response as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//get specific user by id
exports.getById = async (req, res) => {
    const users = await User.findByPk(req.params.id)
    if(users === null){
        res.status(404).send({"error":"User not found"})
    }
    res.send(users)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    let user
    try{
        user = await User.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid input"})
        } else {
            console.log("UsersCreate ", error)
            res.status(500).send({"error":"Server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/users/${user.id}`)
        .json(user)
}
exports.updateById = async (req, res) => {
    let result
    delete ( req.body.id)
    try{
        result = await User.update(req.body, {where: {id: req.params.id}})
    } catch (error) {
        console.log("UsersUpdate: ", error)
        res.status(500).send({"error": "server error, try again later"})
        return
    }
    if(result === 0 || result === undefined) {
        res.status(404).send({"error":"User not found"})
        return
    }
    const user = await User.findByPk(res.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/users/${user.id}`)
        .json(user)
}
exports.deleteById = async (req,res) => {
    let result
    try{
        result = await User.destroy ({where: {id: req.params.id}})
    } catch (error){
        console.log("UsersCreateDelete ", error)
        res.status(500).send({"error":"server error, try again later"})
        return
    }
    if(result === 0 || result === undefined) {
        res.status(404).send({"error":"User not found"})
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