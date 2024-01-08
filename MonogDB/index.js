const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDatabase')
.then(() => console.log("connection is successfull"))
.catch(err => console.log("connection failed", err))

//Schema
const courseSchema = new mongoose.Schema({
    name : {type:String , required:true , minlength : 5 , maxlength : 200},

    tags : {type : Array , validate : {
        validator : function(tags){
             return tags.length > 1
        }
    }},

    category:{
           type:String,
           required :true,
           enum :  ['DSA' , 'Web' , "Mobile" , 'Data Science']
    },
    creator : {type:String , required:true},
    publishedDate : {type:Date , default:Date.now},
    isPublished :{type:String , required:true},
    rating : {type :Number , required : function(){return this.isPublished}}
});

/// Comparision operators
// eq (equal)
// gt(greater than)
// gte ( greater than and equal to)
// lt
// lte

// in
// not in


// Logical Operator 
//or
//and

const Course = mongoose.model('Course' , courseSchema)

async function createCourse(){
    const course = new Course({
        name : 'MongoDB',
        tags : ['express', "database"],
        category : 'Web',
        creator :"Vinod",
        isPublished : true,
        rating:4.5
        
    });

    try {

        const result = await course.save()
        console.log(result)
    } catch (error) {
        for(field in error.errors){
            console.log(error.errors[field])
        }
    }
}// Create

createCourse();

async function getCourses(){

    const courses = await Course.find({rating : {$in : [4.5]}}).select({name :1 , publishedDate:1})
    .or([{creator:'Vinod'} , {rating:4.5}] ,)
   
    console.log(courses)
   
   } // Reading

// getCourses()


async function updateCourse(id){
     
    let course = await Course.findById(id)

    if(!course) return;


    course.name = 'Python'

    course.creator = 'Vinod wani'

    const updatedCourse = await course.save()

    console.log(updatedCourse)



} // Updating

// updateCourse('658d26c3a50ec914f3da0000')

async function deleteCourse(id){
    let course = await Course.findByIdAndDelete(id)

    console.log(course)

    
}// Deleting


// deleteCourse('658d26c3a50ec914f3da0000')