import { ApolloClient, InMemoryCache } from '@apollo/client'
import sdk from 'sdk'

const apolloClient = new ApolloClient({
  uri: `${sdk.url}/graphql`,
  cache: new InMemoryCache()
})

export default apolloClient
