import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const browserClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://api.sajidhasan.dev/graphql",
  }),
});
