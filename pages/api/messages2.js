const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1582641",
    key: "a2eefaf59d574e46fce6",
    secret: "5650eba553c9a3ede8d8",
    cluster: "ap3",
    useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3003', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.post('api/messages', async (req, res) => {
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
    });

    res.json([]);
})


console.log('listening to port 8000');
app.listen(8000)