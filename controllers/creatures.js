const express = require('express');
const router = express.Router()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

router.get('/', (req, res)=>{
    let preJson = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(preJson)
    // console.log(preData);
    // console.log('hello')
    res.render('creatures/cIndex.ejs',{data:preData})
})

router.get('/new', (request,res)=>{
    res.render('creatures/cNew.ejs')
})

router.get('/:id', (req, res)=>{
    let preJson = fs.readFileSync('./prehistoric_creatures.json')
    let preData = JSON.parse(preJson)
    let index = parseInt(req.params.id);
    // console.log(preData);
    // console.log('hello')
    res.render('creatures/cShow.ejs',{data:preData[index],id: index})
})

router.post('/',(request,res)=>{
    let cJson = fs.readFileSync('./prehistoric_creatures.json')
    let cData = JSON.parse(cJson)
    
    cData.push(request.body);
    console.log(cData)
    console.log(request.body)
    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(cData))
    // redirect
    res.redirect('/prehistoric_creatures')
})

router.get('/edit/:id',()=>{
    res.render('creatures/cEdit.ejs')
})

module.exports = router;