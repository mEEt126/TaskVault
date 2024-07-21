'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init({
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CREATED', 'UPDATED', 'DUE', 'DELETED'),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    dueDate:{
        dueDate: DataTypes.Date,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
