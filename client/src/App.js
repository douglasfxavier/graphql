import React from 'react';
import ApplloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//Componentes
import Pessoas from './components/Pessoas'


// Client Apollo
const client = new ApplloClient({
    uri: "http://localhost:4000/graphql"
})

function App() {
  return (
      <ApolloProvider client={client}>
        <div className="App">
            <h1>Prática GraphQL</h1>
            <Pessoas/>
        </div>
      </ApolloProvider>
  );
}

export default App;
