const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgres");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    hotelId: { type: DataTypes.STRING, allowNull: false },
    rooms: { type: DataTypes.JSONB, allowNull: false },
    totalAmount: { type: DataTypes.INTEGER, allowNull: false },
    checkin: { type: DataTypes.DATEONLY },
    checkout: { type: DataTypes.DATEONLY },
    guests: { type: DataTypes.INTEGER },

    status: { type: DataTypes.STRING, defaultValue: "pending" },

  
    paymentStatus: { type: DataTypes.STRING, defaultValue: "pending" }, 
    paymentMethod: { type: DataTypes.STRING }, 
    transactionId: { type: DataTypes.STRING }, 
  },
  { tableName: "bookings" }
);

module.exports = Booking;
