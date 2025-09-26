const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgres");
const Booking = require("./bookingModel"); 

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Booking,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING, 
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending", 
    },
    transactionId: {
      type: DataTypes.STRING, 
    },
  },
  { tableName: "payments" }
);


Booking.hasOne(Payment, { foreignKey: "bookingId" });
Payment.belongsTo(Booking, { foreignKey: "bookingId" });

module.exports = Payment;
