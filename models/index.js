// import models
const Trip = require("./Trip");
const Traveller = require("./Traveller");
const Location = require("./Location");

Traveller.hasMany(Trip, {
  foreignKey: "traveller_id",
  //
});

Trip.belongsTo(Traveller, {
  foreignKey: "traveller_id",
  onDelete: "CASCADE",
});

// Location.belongsTo(Traveller, {
//   foreignKey: "location_id",
// });
// Traveller.hasMany(Location, {
//   foreignKey: "location_id",
// });

Trip.belongsTo(Location, {
  foreignKey: "location_id",
});
Location.hasMany(Trip, {
  foreignKey: "location_id",
});

module.exports = {
  Trip,
  Location,
  Traveller,
};
