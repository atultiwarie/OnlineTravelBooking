const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: console.log, 
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); 
    console.log("PostgreSQL (Neon) connected & synced");
  } catch (err) {
    console.error("PostgreSQL connection error:", err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectPostgres };
