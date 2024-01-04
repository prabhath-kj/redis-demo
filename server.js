import client from "./client.js";
import express from "express"

const app=express()


app.get("/",async(req,res)=>{
    res.json({message:"hi"})
})

app.listen(3000,()=>{
    console.log("Server connected")
})