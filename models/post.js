const Sequelize = require("sequelize");
const Strings = require("../helper/Strings");

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(400),
                allowNull: false
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            commentAllow:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Post",
            tableName: "posts",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey: Strings.fk_user_post_id});
        db.Post.belongsToMany(db.HashTag, {foreignKey: Strings.fk_post_id , through: "PostHashtag"});
    }
}