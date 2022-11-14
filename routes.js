const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const jwtSecret = "lauriciomestreweb";

//middleware
function auth(req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    let bearer = authToken.split(" ");
    let token = bearer[1];
    jwt.verify(token, jwtSecret, (erro, data) => {
      if (erro) {
        res.status(400);
        res.json({ erro: "erro ao autorizar" });
      } else {
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ erro: "erro ao autenticar" });
  }
}

let db = {
  dados: [
    { nome: "marisnanda", idade: 23, sexo: "fem" },
    { nome: "marisnanda", idade: 23, sexo: "fem" },
    { nome: "marisnanda", idade: 23, sexo: "fem" },
    { nome: "marisnanda", idade: 23, sexo: "fem" },
  ],
  users: [
    { email: "mauricio@gmail.com", pass: "12345" },
    { email: "lauzim@gmail.com", pass: "12345" },
  ],
};

router.get("/user", auth, (req, res) => {
  res.status(200);
  res.json(db.dados);
});

//rota de authenticação

router.post("/auth", (req, res) => {
  let { email, pass } = req.body;

  let user = db.users.find((user) => user.email == email);
  if (user != undefined) {
    if (user.pass == pass) {
      jwt.sign(
        { email: email },
        jwtSecret,
        { expiresIn: "24h" },
        (erro, token) => {
          if (erro) {
            res.status(400);
          } else {
            res.status(200);
            res.json({ token: token });
          }
        }
      );
    } else {
      res.status(401);
      res.json({ erro: "senha inválida" });
    }
  } else {
    res.status(400);
    res.json({ erro: "email não encontrado" });
  }
});

module.exports = router;
