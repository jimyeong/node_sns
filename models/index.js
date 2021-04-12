'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const User = require("./user");
const Post = require("./post");
const HashTag = require("./hashtag");
let db = {};


let sequelize = new Sequelize(config.database, config.username, config.password, config);



db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.HashTag = HashTag;

User.init(sequelize);
Post.init(sequelize);
HashTag.init(sequelize);

User.associate(db);
Post.associate(db);
HashTag.associate(db);


module.exports = db;
