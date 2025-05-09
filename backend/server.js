require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const resortRoutes = require('./routes/resorts');
const trailRoutes = require('./routes/trails');
const conditionRoutes = require('./routes/conditions');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/resorts', resortRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/conditions', conditionRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'SkiResortApp'
})
    .then (() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log('Server is running on port: ', process.env.PORT);
            console.log('Connected to database:', mongoose.connection.name);
        }); 
    })
    .catch ((error) => {
        console.log(error)
    });