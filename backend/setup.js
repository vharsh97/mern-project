const mongoose = require("mongoose");
const { Destination } = require("./models/destination.model");
const config = require("./config/config");

(async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create an array of destinations to insert
    const destinations = [
      { name: "India", pricePerPerson: 100 },
      { name: "Africa", pricePerPerson: 150 },
      { name: "Europe", pricePerPerson: 200 },
    ];

    // Insert the destinations using Mongoose
    const result = await Destination.insertMany(destinations);
    console.log(`Inserted ${result.length} destinations`);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
})();
