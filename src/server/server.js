const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Database connected successfully"))
.catch((error)=>{console.log(error)});

const schema = mongoose.Schema({
    email:String,
    psd:String,
});

const model = mongoose.model("loginCred",schema);

const PORT = process.env.PORT | 3000

app.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`);
});

app.post("/login", async (req, res) => {
    const { email, psd } = req.body;
    console.log(email);
    try {
        const user = await model.findOne({ email, psd });
        if (user) {
            res.status(200).json({ message: "Successfully logged in" });
        } else {
            res.status(401).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/signup",async(req,res)=>{
    const{email,psd} = req.body;

    try{
        const existingUser = await model.findOne({"email":email});
        if(!existingUser){
            const data = new model({email,psd});
            await data.save();

            res.status(200).json({message :"Successfully signedup"});
        }
        else{
            res.status(401).json({message :"User already exists"});
        }
    }
    catch(error){
        res.status(500).json({message :"Internal server error"});
    }
    
});

