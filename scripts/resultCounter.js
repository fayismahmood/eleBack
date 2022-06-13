
let fs=require("fs")

let Cant=[
    { "type": "President", "cants": [{ "name": "Samad Muniyoor", "pic": "./1170.jpg" }, { "name": "Ali Cherladukka", "pic": "./1184.jpg" }] },
    { "type": "Secretary", "cants": [{ "name": "Adil Shiriya", "pic": "./713.jpg" }, { "name": "Nafi Eriyappady", "pic": "./1186.jpg" }] },
    { "type": "Treasurer", "cants": [{ "name": "Adnan Cheroor", "pic": "./435.jpg" }, { "name": "Unais Pallathadka", "pic": "./432.jpg" }] }
  
  ]

let data = JSON.parse(fs.readFileSync("res.json"))

let CountRes=Cant.map(e=>{
    let _type=e.type
    return{
        type:_type,
        res:e.cants.map(_cant=>{
            return{
                cant:_cant.name,
                res:data.filter(e=>{return e.vote?.[_type]==_cant.name}).map(e=>e.adno)
            }
        })
    }
})

console.log(CountRes);
fs.writeFileSync("resCount.json",JSON.stringify(CountRes))