Welcome file
Welcome file
# Maslac Election

**requirements:**
 - Nodejs 
 - mysql database
 - ssh key

**Step 1:**
clone or download the repo
**Step 2:**
run  commands


    npm i
    npm install -D typescript
    npm install -D ts-node

to install all node packages required
**Step 3:**
Set a excel file in this format 
| Sn | Ad.No | Class |Name| Booth.No|
|--|--|--|--| --|---|
| 1 | 258 |1|rashid| 1
|2|582|1|afsal|1

**then covert that into json file using** https://products.aspose.app/cells/conversion/excel-to-json

## **Add students into database**

configure your database in `.env` file
copy students json into directory renaming `std.json`

**run command**
 `ts-node add.ts`
 to add students into database
**## Generate Qr**
**run command**
 `ts-node add.ts







Maslac Election
requirements:

Nodejs
mysql database
ssh key
Step 1:
clone or download the repo
Step 2:
run commands

npm i
npm install -D typescript
npm install -D ts-node
to install all node packages required
Step 3:
Set a excel file in this format

Sn	Ad.No	Class	Name	Booth.No
1	258	1	rashid	1
2	582	1	afsal	1
then covert that into json file using https://products.aspose.app/cells/conversion/excel-to-json

Add students into database
configure your database in .env file
copy students json into directory renaming std.json

run command
ts-node add.ts
to add students into database
## Generate Qr
run command
`ts-node add.ts

Markdown 752 bytes 107 words 45 lines Ln 38, Col 16HTML 524 characters 100 words 40 paragraphs