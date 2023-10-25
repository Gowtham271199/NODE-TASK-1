const express = require ("express");
const fs = require ("fs");
const path = require ("path");
const app = express ();

const outputFolder = "./output"

if (!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder);
}

app.get('/createFile',(req,res)=>{
const currentTime = new Date();
const year = currentTime.getFullYear().toString();
const month = (currentTime.getMonth()+1).toString(); //January is Month 0 in JavaScript
const date = currentTime.getDate().toString();
const hour = currentTime.getHours().toString();
const minute = currentTime.getMinutes().toString();
const secs = currentTime.getSeconds().toString();

const dateTimeforFileName=`${year}-${month}-${date}-${hour}-${minute}-${secs}.txt`;

const filepath = path.join(outputFolder,dateTimeforFileName);
fs.writeFile(filepath,currentTime.toISOString(),(err)=>{
    if(err){
        res.status(500).send(`Error creating file:${err}`);
        return;
    }
    res.send(`file created successfully at:${filepath}`);
});
});

app.get('/getFiles',(req,res)=>{
    fs.readdir(outputFolder,(err,files)=>{
        if(err){
            res.status(500).send(`Error reading files:${err}`);
            return;
        }
        console.log("List of Files:",files);
        const textFiles=files.filter((file)=>path.extname(file)===".txt");
        res.json(textFiles);
    });
});

const PORT =3000;

app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
})