module.exports = (sequelize,Sequelize) => {
    const Mangas = sequelize.define("Manga", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: true
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: true
        },
        publication_year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cover_image_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
    })
    return Mangas
}