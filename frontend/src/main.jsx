import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Create a client
const queryClient =new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 6000,
      gcTime: 12000,
    }
   }
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
