const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');
//const { Mongoose } = require('mongoose');
//const marioModel = Mongoose.model('marioCharacter', mario);

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get('/mario',async (request,response) =>{
    response.send(await marioModel.find());
});

app.get('/mario/:id',async (request,response)=>{
    const id= request.params.id;
   try{ const foundId = await marioModel.findOne(id);
    if(foundId == null){
        response.status(400).send('ID not found');
    }else{
        response.send(foundId);
    }}catch(error){
        response.status(400).send({message:error.message});
    }
});

// app.post('/mario',(req,res)=>{
//     let {name,weight} = req.body;
//     if (!name || !weight) {
//         res.statusCode = 400;
//         res.json({ message: 'either name or weight is missing' });
//         return;
//     }
//     const mario = new marioModel({
//         name: name,
//         weight: weight
//     })
//     mario.save().then((ans) => res.status(201).json(ans));
// })

// app.patch('/mario/:id',(req,res)=>{
//     const id= req.params.id;
//     const {name,weight}= req.body;
//     let newObj;
//     if(name && weight){
//         newObj= {name: name, weight: weight};
//     }
//     else if(!name && weight){
//         newObj= {weight: weight};
//     }
//     else if(!weight && name){
//         newObj= {name: name};
//     }
//     else{
//         marioModel.findById(id,(error,result)=> {
//             if(error){
//                 res.status(400).json({message: error.message});
//                 return;
//             }
//             res.json(result);
//         })
//         return;
//     }
//     marioModel.findByIdAndUpdate(id,newObj,{new: true},(error,result)=>{
//         if(error){
//             res.status(400).json({message: error.message});
//             return;
//         }
//         res.json(result);
//     })
// })

// app.delete('/mario/:id',(req,res)=>{
//     const id= req.params.id;
//     marioModel.findByIdAndDelete(id).then(_=>{
//         res.status(200).json({message: "character deleted"});
//     }).catch(error=>{
//         res.status(400).json({message: error.message});
//     })
// })

module.exports = app;