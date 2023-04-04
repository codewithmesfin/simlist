import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import Notifications from "../screens/alerts/Notification";
import Home from "../screens/home/Index";
import Item from "../screens/items/Item";
import ItemImage from "../screens/items/ItemImage";
import Items from "../screens/items/Items";
import AddItem from "../screens/items/newItem/AddItem";
import AddMarketplace from "../screens/marketplace/AddMarketplace";
import Marketplace from "../screens/marketplace/Marketplace";
import Chat from "../screens/messages/Chat";
import Search from "../screens/search/Search";
import Profile from "../screens/user/profile/Index";

const Stack: any = createNativeStackNavigator();

export default function PrivateRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", headerShown: false }}
      />

      <Stack.Screen
        name="Item"
        component={Item}
        options={{ title: "Item", headerShown: false }}
      />
      <Stack.Screen
        name="Items"
        component={Items}
        options={{ title: "Items", headerShown: false }}
      />

      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{ title: "Add your item", headerShown: false }}
      />

      <Stack.Screen
        name="AddMarketplace"
        component={AddMarketplace}
        options={{ title: "Register your Marketplace", headerShown: false }}
      />
      <Stack.Screen
        name="Marketplace"
        component={Marketplace}
        options={{ title: "Marketplace", headerShown: false }}
      />

      <Stack.Screen
        name="ItemImage"
        component={ItemImage}
        options={{ title: "Item Image", headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "My Profile", headerShown: false }}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: "My Notifications", headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: "Search", headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: "Chat", headerShown: false }}
      />
 

    </Stack.Navigator>
  );
}
