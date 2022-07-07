import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default App;
