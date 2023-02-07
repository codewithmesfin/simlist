import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Toolbar } from "../../components";
import HomeScreen from "./HomeScreen";
import Category from "../category/Category";
import MyItems from "../items/MyItems";
import Marketplaces from "../marketplace/Marketplaces";
import Messages from "../messages/Messages";


const Tab = createBottomTabNavigator();

export default function Home(props: any) {
  return (
    <View style={{ backgroundColor: "#edf2f7", flex: 1 }}>
      <Toolbar
        search={() => props.navigation.navigate("Search")}
        profile={() => props.navigation.navigate("Profile")}
      />
      <Tab.Navigator>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            headerShown: false,
            title: "Categories",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="ios-list-circle-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MyItems"
          component={MyItems}
          options={{
            headerShown: false,
            title: "My Items",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="folder-open" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Marketplaces"
          component={Marketplaces}
          options={{
            headerShown: false,
            title: "Marketplaces",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-import-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            headerShown: false,
            title: "Inboxes",
            tabBarIcon: ({ color, size }) => (
             <Ionicons name="ios-chatbubble-ellipses-outline"   color={color}
              size={size}/>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
