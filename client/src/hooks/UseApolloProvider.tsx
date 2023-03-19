import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { from, HttpLink, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { URI } from "../constants/constants";

const httpLink = createHttpLink({
  uri: URI,
});
const uploadLink = createUploadLink({ uri: URI });

// const additiveLink = from([new HttpLink({ uri: URI }), uploadLink]);
// const additiveLink = from([uploadLink, httpLink]);

const authLink = setContext((_, { headers }) => {
  const data: any = localStorage.getItem("auth");
  const parsedDate = JSON.parse(data);
  const token = parsedDate?.token;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const additiveLink = from([authLink, uploadLink, httpLink]);

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  // link: authLink.concat(additiveLink),
  link: additiveLink,
  cache: new InMemoryCache(),
});

interface ProviderProps {
  children: JSX.Element;
}

export const UseApolloProvider: React.FC<ProviderProps> = (
  props
): JSX.Element => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
