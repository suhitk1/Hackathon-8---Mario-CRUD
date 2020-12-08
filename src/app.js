const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// your code goes here

app.get('/mario', async (request, response) => {
    response.send(await marioModel.find());
});

app.get('/mario/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const foundId = await marioModel.findById(id);
        if (foundId == null) {
            response.status(400).send('ID not found');
        } else {
            response.send(foundId);
        }
    } catch (error) {
        response.status(400).send({
            message: error.message
        });
    }
});
//const nullOrUndefined = (val) => {(val == null) || (val == undefined)};
app.post('/mario', async (request, response) => {
    let {
        name,
        weight
    } = request.body;
    try {
        if (name === null || name === undefined || weight === null || weight === undefined) {
            response.status(400).send({message: 'either name or weight is missing'});
            return;
        }
        const mario = new marioModel({
            name: name,
            weight: Number(weight)
        });
        await mario.save();
        response.status(201).send(mario);
    } catch (e) {
        response.status(400).send({message: 'either name or weight is missing'});
    }
});

app.patch('/mario/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const foundId = await marioModel.findById(id);
        if (foundId == null) {
            response.status(400).send({
                message: error.message
            });
        } else {
            const {
                name,
                weight
            } = request.body;
            let newObj;
            if (name && weight) {
                newObj = {
                    name: name,
                    weight: weight
                };
            } else if (!name && weight) {
                newObj = {
                    weight: weight
                };
            } else if (!weight && name) {
                newObj = {
                    name: name
                };
            } else {
                response.status(400).send({
                    message: error.message
                });
                return;
            }
            const update = await marioModel.findOneAndUpdate(id, newObj, {
                returnOriginal: false
            });
            response.send(update);
        }
    } catch (error) {
        response.status(400).send({
            message: error.message
        });
    }
});

app.delete('/mario/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const res = await marioModel.findById(id);
        if (res == null) {
            response.status(400).send({
                message: error.message
            })
        } else {
            await marioModel.findByIdAndDelete(id);
            response.status(200).send({
                message: 'character deleted'
            });
        }
    } catch (error) {
        response.status(400).send({
            message: error.message
        });
    }
});

module.exports = app;