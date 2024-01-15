const AnimesController = require('../controllers/AnimesController.js')

module.exports =(app) => {
    app.route("/animes")
        .get(AnimesController.getAll) //get all animes as list
        .post(AnimesController.createNew)
    app.route("/animes/:id")
        .get(AnimesController.getById)
        .put(AnimesController.updateById)
        .delete(AnimesController.deleteById)
}