const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Project name is required' }
    }
  },
  frontend: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['react', 'vue', 'angular', 'nextjs', 'svelte', 'none']]
    }
  },
  backend: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['express', 'fastify', 'nest', 'go', 'python', 'none']]
    }
  },
  database: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['mongodb', 'postgres', 'mysql', 'sqlite', 'redis', 'none']]
    }
  },
  architecture: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['mvc', 'microservices', 'monolithic']]
    }
  }
});

User.hasMany(Project, { foreignKey: 'userId', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'userId' });

module.exports = Project;
