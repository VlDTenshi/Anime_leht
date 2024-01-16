const AnimesController = require('../controllers/AnimesController.js')
const MangasController = require('../controllers/MangasController.js')
const UsersController = require('../controllers/UsersController.js')

module.exports =(app) => {
    app.route("/animes")
        .get(AnimesController.getAll) //get all animes as list
        .post(AnimesController.createNew)
    app.route("/animes/:id")
        .get(AnimesController.getById)
        .put(AnimesController.updateById)
        .delete(AnimesController.deleteById)
    app.route("/mangas")
        .get(MangasController.getAll) //get all animes as list
        .post(MangasController.createNew)
    app.route("/mangas/:id")
        .get(MangasController.getById)
        .put(MangasController.updateById)
        .delete(MangasController.deleteById)
    app.route("/users")
        .get(UsersController.getAll) //get all animes as list
        .post(UsersController.createNew)
    app.route("/users/:id")
        .get(UsersController.getById)
        .put(UsersController.updateById)
        .delete(UsersController.deleteById)
}