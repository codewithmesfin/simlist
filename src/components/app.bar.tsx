import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { color} from "../utils";
import Icon from "./icon";

export default function Toolbar(props: any) {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
      }}
    >
      {props.back ? (
        <TouchableOpacity
          style={{ paddingRight: 20 }}
          onPress={() => navigation.pop()}
        >
        <Icon name="back" />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flex: 1,
          paddingRight: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 40, height: 35, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            paddingLeft: 5,
            color:color.primary,
            textTransform: "capitalize",
          }}
        >
          simlist
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#edf2f7",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          width: 40,
          borderRadius: 40 / 2,
        }}
      >
       <TouchableOpacity onPress={() => navigation.navigate("Search")}>
         <Icon name="search"/>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#edf2f7",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          width: 40,
          borderRadius: 40 / 2,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
         <Icon name="notification" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#edf2f7",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          width: 40,
          borderRadius: 40 / 2,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="user"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
