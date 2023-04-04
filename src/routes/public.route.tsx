import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import Intro from "../screens/intro/Index";
import FinishSignup from "../screens/user/auth/FinishSignup";
import Signin from "../screens/user/auth/Signin";
import Signup from "../screens/user/auth/Signup";

const Stack = createNativeStackNavigator();

export default function PublicRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ title: "Intro", headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ title: "Signin", headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup", headerShown: false }}
      />
      <Stack.Screen
        name="FinishSignup"
        component={FinishSignup}
        options={{ title: "Finish Signup", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
