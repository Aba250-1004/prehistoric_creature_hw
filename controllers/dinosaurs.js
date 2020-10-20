const express = require('express');
const router = express.Router();
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')


router.use(ejsLayouts)
// body pareser middleware
router.use(express.urlencoded({extended: false}))


router.get('/',(request,res)=>{
    let dinoJson = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinoJson)

    // handle query str
    console.log(request.query.nameFilter);
    let nameFilter = request.query.nameFilter;
    if (nameFilter){
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        })
    }

    res.render('dinosaurs/index.ejs',{dinosaurs:dinoData})
})

router.get('/new', (request,res)=>{
    res.render('dinosaurs/new.ejs')
})


router.get('/:id',(request,res)=>{
    let dinoJson = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinoJson)

    let dinoIndex = parseInt(request.params.id);
    res.render('dinosaurs/show.ejs',{dino:dinoData[dinoIndex],dinoId: dinoIndex})
})

router.post('/',(request,res)=>{
    let dinoJson = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinoJson)
    dinoData.push(request.body);
    console.log(request.body)
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    // redirect
    res.redirect('/dinosaurs')
})

module.exports = router;