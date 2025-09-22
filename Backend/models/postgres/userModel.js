const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgres");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "users" }
);

User.beforeCreate(async (user) => {
  if (user.password_hash)
    user.password_hash = await bcrypt.hash(user.password_hash, 10);
});

User.prototype.checkPassword = async function (plain) {
  return await bcrypt.compare(plain, this.password_hash);
};

module.exports = User;
