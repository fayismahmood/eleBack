const express = require('express')
const fs = require('fs')
const app = express()
const port = 8000
const { exec } = require('child_process');

let Idgen=require("./scripts/idCardgen")


var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))

const editDotenv = require('edit-dotenv');
let dotenv = require('dotenv')
dotenv.config()
let { PrismaClient } = require('@prisma/client');

let Prisma = new PrismaClient()
app.get('/settings', (req, res) => {
  let _env = fs.readFileSync(".env", "utf8")
  let _data = dotenv.parse(_env)
  res.json(_data)
})

app.get('/std', async (req, res) => {
  res.json(await Prisma.std.findMany({}))
})

app.post('/std', async (req, res) => {
  let stds = req.body.std
  let Insert = await Promise.all(stds.map(async (e) => {
    try {
      await Prisma.std.create({ data: { name: e.Name, adno: e['Ad.No'], booth: e["Booth.No"], class: e["Class"] } })
      return{[e["Ad.No"]]:"Success"}
    } catch (error) {
      console.log(e['Ad.No'], error);
    }

  }))
  if (Insert) {

    res.json({ status: "ok" })
  }
})

app.get('/idgen', async (req, res) => {
  res.send(await Idgen())
})



app.post('/settings', (req, res) => {
  let newData = req.body.Settings
  let _env = fs.readFileSync(".env", "utf8")
  let newEnv = editDotenv(_env, newData)

  fs.writeFileSync(".env", newEnv,)

  exec('npx prisma db push | npx prisma generate', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: No. of directories = ${stdout}`);
    if (stderr != "")
      res.json({ status: "ok" })
    console.error(`stderr: ${stderr}`);
  });





})

app.use(express.static('adminfr/dist'))
app.use(express.static('public'))



app.listen(3000, () => {
  console.log("listen on port 3000");
})