import express from "express";
import morgan from "morgan";
import cors from "cors"

const port = process.env.PORT || 3001;
const app = express();

const user = [];

app.use(express.json());
app.use(morgan('short'));

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send("Server is working")
})

// get all user
app.get('/users', (req, res) => {
    res.json(user)
})

// add user
app.post('/user', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.address) {
        res.status(400).send('invalid data');
    }
    else {
        user.push({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })
        res.json({response: 'User Created'});
    }
})

// update user
app.put('/user/:id', (req, res) => {
   
    if (user[req.params.id]) {
        if (req.body.name) {
            user[req.params.id].name = req.body.name;
        }
        if (req.body.email) {
            user[req.params.id].email = req.body.email;
        }
        if (req.body.address) {
            user[req.params.id].address = req.body.address;
        }

        res.send({reponse: "Success"})
    }
    else {
        res.send({error: "Invalid Id"})
    }
})

// delete user
app.delete('/user/:id', (req, res) => {
   
    if (user[req.params.id]) {
        user.splice(req.params.id, 1)
        res.send({reponse: "Success"})
    }
    else {
        res.send({error: "Invalid Id"})
    }
})

app.listen(port);
