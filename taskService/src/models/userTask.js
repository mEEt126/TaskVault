'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {

    static associate(models) {
      UserTask.belongsTo(models.Task, { foreignKey: 'taskId' });
    }
    
  }
  
  UserTask.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'UserTask',
    tableName: 'UserTasks',
    timestamps: false,
  });

  return UserTask;
};
