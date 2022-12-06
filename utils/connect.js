const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = async (uri) => {
  const db = await mongoose.connect(uri);
  return db;
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  connect,
  disconnect,
};
