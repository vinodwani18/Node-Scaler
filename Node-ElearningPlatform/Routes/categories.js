const express = require('express')
const {Category, validateData} = require('../models/categoriesmodel')
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res)=> {
    let categories = await Category.find();
    res.send(categories);
}); // read

router.post('/' , async (req , res)=>{
   const {error} = validateData(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const category = new Category({
        name: req.body.name
    })
    await category.save();
    res.send(category)

}) // Create

router.put('/:id' , async (req , res)=>{
    const {error} = validateData(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if(!category) res.status(404).send('The category you are looking for does not exist')
    res.send(category)
}) // Update Data


router.get('/:id' , async (req , res)=>{
    let category = await Category.findById(req.params.id)
    if(!category) res.status(404).send('The category you are looking for does not exist')
    res.send(category)
})

router.delete('/:id' , async (req , res)=>{
    const category = await Category.findByIdAndRemove(req.params.id);
    if(!category) res.status(404).send('The category you are looking for does not exist')
    res.send(category)
})


module.exports = router;