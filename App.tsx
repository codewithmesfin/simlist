
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import React from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { AuthProvider } from "./src/context/auth.context";
import { SnackbarProvider } from "./src/context/snackbar.context";
import { PopupProvider } from "./src/context/popup.context";
import Routes from "./src/routes";
import auth from "./src/service/auth.services";
import { constants } from "./src/utils";




const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await auth.getToken()
  // console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Initialize Apollo Client
const uri = `${constants.API_ROOT}/graphql`

const httpLink = createUploadLink({
  uri: uri,
});




const client = new ApolloClient({
  // link: createUploadLink({ uri,authLink }),
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  return (<ApolloProvider client={client}>
    <SnackbarProvider>
      <PopupProvider>
        <AuthProvider>
          <KeyboardAvoidingView
            style={{ height: "100%", flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar backgroundColor="white" barStyle="dark-content" />
              <Routes />
            </SafeAreaView>
          </KeyboardAvoidingView>
        </AuthProvider>
        </PopupProvider>
    </SnackbarProvider>
  </ApolloProvider>
  );
}

