import { PrismaClient } from "@prisma/client";
import fs from "fs";
let Prisma = new PrismaClient()
let _all = Prisma.std.findMany().then(e => {

    fs.writeFile("./res.json", JSON.stringify(e), "utf-8",
        function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('It\'s saved!');
            }

        })

})
