module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'username'
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'role'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
