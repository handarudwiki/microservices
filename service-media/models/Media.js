const {Sequelize ,DataTypes } = require("sequelize");
require('dotenv').config()

const {DB_NAME, DB_HOSTNAME, DB_PASSWORD, DB_USERNAME} = process.env
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOSTNAME,
    dialect: 'mysql', // Ganti dengan dialect yang sesuai
    // Opsi tambahan sesuai kebutuhan
  }); 

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'media',
  timestamps: true, // Aktifkan timestamps
  underscored: true, // Jika ingin menggunakan nama kolom dalam format snake_case
});

module.exports = Media;