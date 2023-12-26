'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
     await queryInterface.bulkInsert('users', [
      {
       name: 'John Doe',
       email : 'john@gmail.com',
       password : await bcrypt.hash('password',10),
       profession : 'backend developer',
       role : 'student',
       created_at : new Date(),
       updated_at : new Date()
     },
      {
       name: 'Handaru ',
       email : 'dwiking@gmail.com',
       password : await bcrypt.hash('password',10),
       profession : 'senior backend developer',
       role : 'admin',
       created_at : new Date(),
       updated_at : new Date()
     },

    ]);
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
  }
};
