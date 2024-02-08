const { DataTypes, Model } = require('sequelize')
const db = require('./db.client.js')

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Article',
    tableName: 'articles',
  },
)

module.exports = Article
