const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path')
const adminRouter = require('./Router/adminRouter')
const userRouter = require('./Router/userRouter')

const mongoose = require('mongoose')


const app = express();

dotenv.config({path:".env"});
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// session
app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use('/Public', express.static(path.join(__dirname, 'Public')));


// connecting to react 
// app.use(cors({
//     origin: 'http://localhost:5173', // This is the correct version
//     credentials: true
// }));
// app.use(cors({
//     origin: 'https://doba-frondent.onrender.com', // This is the correct version
//     credentials: true
// }));

const buildpath = path.join(__dirname,"../FRONTEND/doba-project/dist")
app.use(express.static(buildpath))

app.use(cors({
    origin: '*', 
    credentials: true
}));


app.use('/admin',adminRouter);
app.use('/api',userRouter);


app.get("*", (req, res) => {
    res.sendFile(
      path.join(buildpath, "index.html")
    );
  });

mongoose.connect(process.env.DOBA_MONGO_ATLES)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=> {
    console.log("Connection failed!!");
})


// Backend Server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
