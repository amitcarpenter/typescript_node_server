import mongoose, { connect } from "mongoose";

const DB_URI = "mongodb://localhost/ts_practice";
function mongodb_connection() {
  return connect(DB_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("error to connection db" + err);
      return err;
    });
}

export default mongodb_connection;
