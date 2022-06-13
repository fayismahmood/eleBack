const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const port =8000


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('dist'))


// parse application/json
app.use(bodyParser.json())

let { PrismaClient } =require("@prisma/client");
let Prisma=new PrismaClient();
var cors = require('cors')



//app.use(cors(corsOptionsDelegate))
var allowlist = ['https://192.168.0.113:3000', 'https://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))


require('dotenv').config();
let tokenkey = process.env.tokenkey
let jwt=require("jsonwebtoken");






app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/varify', async (request, reply) => {
    let _hash=request.body.hash;
    try {
      let varify=jwt.verify(_hash,tokenkey)
      let Voted=await Prisma.Std.findUnique({where:{adno:varify.adno}})
      console.log(varify,Voted);
      if(Voted&&Voted.vote&&!Object.keys(Voted.vote).length==0){
        reply.send({status:"voted",data:varify})
  
      }else{
        reply.send({status:"not_voted",data:varify})
      }
      //console.log(Voted);
    } catch (error) {
      
      reply.send({err:error})
    }
  })
  
  app.post('/vote', async (request, reply) => {
    let _hash=request.body.hash;
    let _vote=request.body.vote;
    
    try {
      let varify=jwt.verify(_hash,tokenkey)
      let _adno=varify.adno
     
      let Upd=await Prisma.Std.update({where:{adno:_adno},data:{vote:_vote}})
      reply.send({status:"ok"})
    } catch (error) {
      reply.send({err:error})
    }
  })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

https.createServer({
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.cert')
}, app).listen(8000, () => {
  console.log('Listening...')
})

