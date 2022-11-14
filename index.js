const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes.js"));

app.listen(3000, (erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("servidor online");
  }
});
