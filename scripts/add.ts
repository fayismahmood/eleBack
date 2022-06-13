import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import  fs from "fs";
let file=JSON.parse(fs.readFileSync("./std.json").toString())
console.log(file);

// prisma.std.createMany({data:
// file.map((e:any)=>({name:e.Name,adno:e['Ad.No'],booth:e["Booth.No"],class:e["Class"]}))
    
// }).then(e=>{
//     console.log(e,"ssss");
    
// })
file.forEach(async (e:any)=>{
    try {
        await prisma.std.create({data:{name:e.Name,adno:e['Ad.No'],booth:e["Booth.No"],class:e["Class"]}})
        
    } catch (error) {
        
        console.log(e['Ad.No']);
    }
    
})
