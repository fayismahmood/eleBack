import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const { createCanvas, loadImage } = require('canvas')
import fs from "fs";
require('dotenv').config();

let tokenkey: string | undefined = process.env.tokenkey

import QRCode from "qrcode"
import jwt from "jsonwebtoken";

async function gen() {
    let std = await prisma.std.findMany({select:{adno:true,booth:true,class:true,name:true}})
    let tt = await Promise.all(std.map(async e => {
        if (tokenkey) {
            let hashToken = jwt.sign(e, tokenkey)
            const toDataURL = await QRCode.toDataURL(hashToken)

            return `
        <div class="eId">
        <div class="head">
            <div>MASLAC</div>
            <div>
                General Election
            </div>
        </div>
        <div class="booth">
        Booth No: ${e.booth}
        </div>
       <div class="cont">
       <img src="${toDataURL}" />
       <div>
            <div><b>${e.name}</b></div>
            <div>AddNo: <b>${e.adno}</b></div>  
            <div>Class: <b>${e.class}</b></div>  
       </div>
       </div>
        </div>
        `
        } else {
            return `
            <div>
            <div> adno:${e.adno}</div>  
            <div>name : ${e.name}</div>
            
            ERROR
            </div>
            `
        }


    }))
    return tt

}
export default async function idgen(){
    let e=await gen();
    let _elms:[]=[]
    e.forEach((e:any,i:any)=>{
            let n=Math.ceil(i/12)
             // @ts-ignore
            _elms[n]?_elms[n]=[..._elms[n],e]:_elms[n]=[e];    
        })
        //console.log(_elms);
        
        let fullHtml=`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="style.css">
    
        </head>
        <body>
            <div class="cards">
            ${_elms.map((e:any)=>(`<div class="page">
            ${e.join("")}
            
            </div>`)).join("")}
            </div>
        </body>
        </html>`

        return fullHtml;
  
    
}
