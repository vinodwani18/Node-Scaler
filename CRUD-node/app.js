const express = require('express')
const morgan = require('morgan')
const myMiddlewareFunction = require('./middleware/middle')

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(myMiddlewareFunction)

const courses = [
    {
        id: 1,
        name: 'Java'
    },
    {
        id: 2,
        name: 'JavaScript'
    },
    {
        id: 3,
        name: 'Python'
    },
]

app.get('/', (req, res)=> {
  console.log("first route");
});

app.get('/about', (req, res)=> {
    res.send('about node')
});

app.get('/courses', (req, res)=> {
    res.send(courses);
});

app.post('/courses' , (req , res)=>{
    console.log(req);
    const course ={
        id : courses.length +1,
        name :  req.body.name
    }
      courses.push(course)
      res.send(course)

}) // Create


// put method

app.put('/courses/:coursename' , (req , res)=>{
    let course = courses.find(course => course.name === req.params.coursename)
    if(!course) res.status(404).send('The course you are looking for does not exist')


    course.name = req.body.name
    res.send(course)
}) // Update Data



// Route Parameters

app.get('/courses/:coursename' , (req , res)=>{
    //console.log(req.params.coursename)
    let course = courses.find(course => course.name === req.params.coursename)
    

    if(!course) res.status(404).send('The course you are looking for does not exist')
    res.send(course)
})



// app.delete('/courses/:coursename' , (req , res)=>{
//     let UpdatedCourses = courses.filter(course => course.name !== req.params.coursename)

//     courses = UpdatedCourses

//     res.send(courses)
// })




app.delete('/courses/:id' , (req , res)=>{
    let course = courses.find(course => course.id === parseInt(req.params.id))
    console.log(course)
    if(!course) res.status(404).send('The course you are looking for does not exist')

    const index = courses.indexOf(course)

    courses.splice(index , 1)

    res.send(course)
    
})

const port = process.env.PORT || 3000
app.listen(port , ()=> console.log(`Port is running on ${port}`))