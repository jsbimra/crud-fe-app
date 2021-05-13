import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
  // gql
} from "@apollo/client";

import "./styles.css";

import App from "./App";
import { URI } from "./utlity/constants";

const client = new ApolloClient({
  uri: URI.CUSTOM_APOLLO_SERVER_URI,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

// const result = gql`
//   query {
//     employees {
//       emp_id
//       name
//       email
//       designation
//     }
//   }
// `;

// console.log("data fetched!", result);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>,
  rootElement
);
