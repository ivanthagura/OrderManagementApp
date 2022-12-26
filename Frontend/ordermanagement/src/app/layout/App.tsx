import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import CustomersDashboard from '../../features/customers/customersDashboard/CustomersDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Layout from './Layout';
import HomePage from '../../features/home/HomePage';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {}
  }),
  uri: process.env.REACT_APP_API_SCHEMA_URL
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage/>} />
            <Route path="customers" element={<CustomersDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
