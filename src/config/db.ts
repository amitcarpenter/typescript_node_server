import mongoose, { ConnectOptions } from "mongoose";

const DB_URI = "mongodb://localhost/ts_practice";

const connect_mongodb = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Database Connected SuccessFully");
  } catch (error) {
    console.log("Database Connection Error", error);
    process.exit(1);
  }
};

export default connect_mongodb;
