import express from "express";
import cors from "cors";
import connection from './database.js'

const app = express();
app.use(express.json());
app.use(cors());

app.get("/itens",async (req,res)=>{
    try{
        const result = await connection.query(`select * from list`);
        console.log(result.rows)
        res.send(result.rows)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

app.post("/new", async (req,res) =>{
    try{
        const { text } = req.body; 

        await connection.query(`
            INSERT INTO list
            (name)
            VALUES ($1)
        `,[text])
        
        res.sendStatus(201)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

export default app;
