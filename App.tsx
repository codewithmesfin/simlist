
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Provider } from "react-redux";
import Routes from "./src/routes";
import { store } from "./src/stores";

export default function App() {
  return (
    <KeyboardAvoidingView
      style={{ height: "100%", flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Provider store={store}>
        <Routes />
        </Provider>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
