const express = require("express");
const members = require("./Members");
const uuid = require("uuid");
const app = express();   //creatation of object of express or function call

app.use(express.json());

//get all members
app.get("/api/members",(req,res) =>{
    return res.status(200).json({members});
});

//get a specific member
app.get("/api/members/:id",(req,res) =>{
    // console.log(req.params.id);
    const found = members.some(mem => mem.id === parseInt(req.params.id))
    if(found){
        return res.json(members.filter(mem => mem.id === parseInt(req.params.id)));
    }
    else{
        return res.status(400).json({msg:`No Member found, Invalid id ${req.params.id}`})
    }
});

//add a new value in the members (post)
app.post("/api/members",(req,res) =>{
    console.log(req.body)
    // const{name,email} = {...req.body}   Object distructing,this is known as shorthand operator(works on keyvalue pair)
    // console.log(name,email);

    // const newMember = {
    //     id:uuid.v4(),
    //     name,
    //     email,
    //     status:"active"
    // } another way to write the below code

    const newMember = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:"active"
    }
    
    if(!newMember.name || !newMember.email)
    {
        return res.status(400).json({msg:"Please include name and email"});
    }

    else
    {
        members.push(newMember);
        return res.status(200).json({msg:"Member added Succesfully"});
    }
})

//update a member (put)
app.put("/api/members/:id",(req,res) =>{
    const found = members.some(mem => mem.id === parseInt(req.params.id))
    if(found) 
    {
        const updatedMember = req.body;
        members.forEach(mem => {
            if(mem.id === parseInt(req.params.id))
            {
                mem.name = updatedMember.name;
                mem.email = updatedMember.email;
                return res.json({msg:"Member Updated",mem});
            }
        });
    }

    else
    {
        return res.status(400).json({msg:`No Member found with id ${req.body.id}`})
    }

});


//Delete a member (delete)
app.delete("/api/members/:id",(req,res) =>{
    const found = members.some(mem => mem.id === parseInt(req.params.id))
    if(found)
    {
        return res.json({msg:"Member Deleted",members:members.filter(mem => mem.id !== parseInt(req.params.id))})
    }
    else
    {
        return res.status(400).json({msg:`No Member Found with id ${req.params.id}`})
    }
})


// app.get("/",(req,res) =>{
//     res.send("<h1>This is get abc</h1>");    
// });

// app.get("/",(req,res) =>{
//     res.send("<h1>This is post Request</h1>");    
// });




const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`Server is running on ${PORT}`));




//express commands

//to install express
//npm install express

//to uninstall express
//npm uninstall express

//to install nodemon globally
//npm -g install nodemon

//to install nodemon as dev dependencie
//npm install --save-dev nodemon 

//to run nodemon
//npm run dev




