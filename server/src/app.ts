import express from "express";
import { env } from "./config/env";

const app = express();

app.get('/',(req,res)=>{
    res.status(200);
    res.json({message:'hello'});

})
app.listen(env.PORT,()=>{
    console.log(`App listening on port ${env.PORT}`);
})