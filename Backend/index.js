const express=require("express")
// const mongoose=require("mongoose")

const {connection}=require("./data")
const app=express()
const {userRouter}=require("./routes/router")
const {noteRouter}=require("./routes/note.routes")
require("dotenv").config()

const cors=require("cors")
const {authenticate}=require("./middleware/midlleware.auth")
app.use(express.json())
app.use(cors())


// //registration

// app.post("/register",(req,res)=>{
//     res.send("registration done")
// })

// //login

// app.post("/login",(req,res)=>{
//     res.send("login done")
// })

app.use("/users",userRouter)
app.use(authenticate)
app.use("/note",noteRouter)

app.listen(8000,async()=>{
    try {
        await connection
        console.log("mongo is connected")
    } catch (error) {
        console.log("not connected")
        console.log(error)
        
    }

    console.log(`port is running on ${process.env.port}`)

})
