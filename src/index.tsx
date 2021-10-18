import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import './index.css';
import Dashboard from './components/Dashboard';
import { DATA_API_URL } from './constants';

const link = createHttpLink({
  uri: DATA_API_URL,
  credentials: 'include',
  headers: {
    'x-hasura-admin-secret':
      'EbKbCJjLgH0RM0OJg27GSLsC4ypapPos2RIEyNU9FBU6oGj0M31kXW4EKfeL1JVs',
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
