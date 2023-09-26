const { app } = require("./server");

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Error starting the server!");
  }
  console.log(`Server started! Listening on port: ${PORT}`);
});
