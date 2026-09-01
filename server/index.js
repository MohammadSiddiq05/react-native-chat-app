import dotenv from "dotenv";
dotenv.config();

import  app  from "./src/app.js";

const startServer = async () => {
  try {
    app.listen({ port: 3000, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Server is running on port 3000");
      }
    });
  } catch (err) {
    console.log("Error occured when starting server =>",err);
  }
};

startServer();
