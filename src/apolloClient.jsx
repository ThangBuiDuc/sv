import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

// const client = new ApolloClient({
//   link: authLink.concat(splitLink),
//   cache: new InMemoryCache(),
// });

const getToken = async () => {
  const { getToken } = useAuth();
  return await getToken({
    template: import.meta.env.VITE_APP_HASURA_PAY_TEMPLATE,
  });
};

const httpLink = new HttpLink({
  uri: `https://hpu-pay.hasura.app/v1/graphql`,
});

// const authLink = setContext(async (_, { headers }) => {
//   const token = await getToken();
//   console.log(token);
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const wsLink = new GraphQLWsLink(
  createClient({
    url: `wss://hpu-pay.hasura.app/v1/graphql`,
    // options: {
    //   reconnect: true,
    //   connectionParams: async () => {
    //     const token = await getToken();
    //     return {
    //       authToken: token,
    //     };
    //   },
    // },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
