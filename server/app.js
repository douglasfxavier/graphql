const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors') ;

const app = express();

// Permissão cors
app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true

}));

app.listen(4000,() => {
    console.log("Listening na porta 4000")
});
