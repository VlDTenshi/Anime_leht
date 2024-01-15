module.exports = (sequelize,Sequelize) => {
    const Anime = sequelize.define("Animes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        release: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
    })
    return Anime
}