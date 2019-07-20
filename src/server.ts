import express from "express";
import bodyParser from 'body-parser';
import request from 'request';
import path from "path";

require('dotenv').config()

const app = express()

app.use("/assets", express.static(path.join(__dirname, "frontend")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function () {
  console.log('App is listening on port 3000!')
})
