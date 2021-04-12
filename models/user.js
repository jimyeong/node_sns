const Sequelize = require("sequelize");
const Strings = require("../helper/Strings");



module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email: {
                type:Sequelize.STRING(50),
                allowNull: false, // here
                unique: true
            },
            password: {
                type: Sequelize.CHAR(65),
                allowNull:  true
            },
            nick:{
                type:Sequelize.STRING(15),
                allowNull: false,
            },
            // sns login 한경우
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: "local"
            },
            snsId: {
                type: Sequelize.STRING(50),
                allowNull: true
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }

    // db
    static associate(db){
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: Strings.fk_follower_id,
            as: Strings.following_id,
            through: Strings.model_follow
        })

        db.User.belongsToMany(db.User, {
            foreignKey: Strings.fk_following_id,
            as: Strings.fk_follower_id,
            through: Strings.model_follow
        })
    }
}