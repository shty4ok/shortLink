'use strict';
module.exports = (sequelize, DataTypes) => {
  const Links = sequelize.define('Links', {
    longLink: DataTypes.STRING,
    shortLink: DataTypes.STRING,
    buttonKey: DataTypes.BOOLEAN,
  }, {});
  Links.associate = function(models) {
    // associations can be defined here
  };
  return Links;
};
