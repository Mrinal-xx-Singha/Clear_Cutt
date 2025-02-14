import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected 🔗");
  });
  await mongoose.connect(`${process.env.MONGO_DB_URI}/ClearCut`);
};
export default connectDB;
