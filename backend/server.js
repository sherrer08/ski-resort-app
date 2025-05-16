require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

const resortRoutes = require('./routes/resorts');
const trailRoutes = require('./routes/trails');
const conditionRoutes = require('./routes/conditions');
const userRoutes = require('./routes/user');
const cors = require('cors');

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

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'SkiResortApp'
})
    .then (() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log('Server is running on port: ', process.env.PORT);
            console.log('Connected to database:', mongoose.connection.name);
            console.log('GraphQL endpoint: http://localhost:' + PORT + '/graphql');
        }); 
    })
    .catch ((error) => {
        console.log(error)
    });