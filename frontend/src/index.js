import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));