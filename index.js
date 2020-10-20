const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
 
app.set('view engine','ejs');
app.use(ejsLayouts)
// body pareser middleware
app.use(express.urlencoded({extended: false}))

app.get('/',(request,res)=>{
    res.render('home.ejs')
})

const dinosaurs = require('./controllers/dinosaurs')
app.use('/dinosaurs', dinosaurs)

// app.get('/dinosaurs',(request,res)=>{
//     let dinoJson = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinoJson)

//     // handle query str
//     console.log(request.query.nameFilter);
//     let nameFilter = request.query.nameFilter;
//     if (nameFilter){
//         dinoData = dinoData.filter((dino)=>{
//             return dino.name.toLowerCase() === nameFilter.toLowerCase();
//         })
//     }

//     res.render('index.ejs',{dinosaurs:dinoData})
// })

// app.get('/dinosaurs/new', (request,res)=>{
//     res.render('new.ejs')
// })


// app.get('/dinosaurs/:id',(request,res)=>{
//     let dinoJson = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinoJson)

//     let dinoIndex = parseInt(request.params.id);
//     res.render('show.ejs',{dino:dinoData[dinoIndex],dinoId: dinoIndex})
// })

// app.post('/dinosaurs',(request,res)=>{
//     let dinoJson = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinoJson)
//     dinoData.push(request.body);
//     console.log(request.body)
//     fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
//     // redirect
//     res.redirect('/dinosaurs')
// })

const preHis = require('./controllers/creatures')
app.use('/prehistoric_creatures', preHis)

app.listen(8000,()=>{
    console.log('Connected');
})