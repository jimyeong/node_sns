const Sequelize = require("sequelize");
const Strings = require("../helper/Strings");


module.exports = class HashTag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: "HashTag",
            tableName: "hashtags",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        });
    }
    static associate(db){
        db.HashTag.belongsToMany(db.Post, {
            foreignKey: Strings.fk_hashtag_id,
            through: "PostHashtag"
        })
    }
}
