
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { AuthProvider } from "./src/context/auth.context";
import { SnackbarProvider } from "./src/context/snackbar.context";
import { createUploadLink } from 'apollo-upload-client';
import Routes from "./src/routes";


// Initialize Apollo Client
const uri='http://192.168.1.6:3301/api'
const client = new ApolloClient({
  link: createUploadLink({ uri }),
  cache: new InMemoryCache()
});


export default function App() {
  return (<ApolloProvider client={client}>
    <SnackbarProvider>
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
    </SnackbarProvider>
  </ApolloProvider>
  );
}
