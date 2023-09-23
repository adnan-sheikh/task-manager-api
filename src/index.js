const express = require("express");

const PORT = 3000;
const app = express();

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Error starting the server!");
  }
  console.log(`Server started! Listening on port: ${PORT}`);
});
