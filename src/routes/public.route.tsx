import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import Intro from "../screens/intro/Index";
import Signin from "../screens/user/auth/Signin";

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
    </Stack.Navigator>
  );
}
