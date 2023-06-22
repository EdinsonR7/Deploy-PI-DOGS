const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    idDog:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    },
    Breed:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ['Years of life']: { type: DataTypes.STRING, allowNull: false },
    
    Image:{
      type: DataTypes.TEXT,
    },
    Weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Height:{type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
  );
};
