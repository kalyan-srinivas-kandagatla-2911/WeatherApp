const express=require("express");
const https=require("https")
const app=express();
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/",function(req,res){
    console.log(req.body.city);

    https.get("https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&units=metric&appid=a811d1e0783a246daca6ecb1cb8fc3ac",function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            // console.log(JSON.parse(data));
            const temp=weatherData.main.temp;
            // console.log(temp);
            const des=weatherData.weather[0].description;
            // console.log(des);
            const imag=weatherData.weather[0].icon;
            const imgURL="https://openweathermap.org/img/wn/"+imag+"@2x.png";
            const queri=req.body.city;
            res.type("html")
            
            res.write('<h1> The temperature in '+ queri+' is K='+temp+' Celcius and you can feel '+des+"</h1>");
            // text = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");node
            res.write("<img src="+imgURL +">")
            res.send();

        })
    })
})


app.listen(3000,function(){
    console.log("Server started");
})