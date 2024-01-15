const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.Name,
    process.env.User,
    process.env.Pass,
    {
        host: process.env.HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        }
    }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.Animes = require("./models/Anime.model")(sequelize,Sequelize)

module.exports = db

async function Sync(){
    await sequelize.sync({alter:true}) //modifies existing table
                                    //force:true erases existing table and recreates it
}
module.exports = {db, Sync}