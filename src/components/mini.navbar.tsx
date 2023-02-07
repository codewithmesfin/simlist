import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "./icon";

interface PROPS {
  title: string;
  noBackBtn?: boolean;
  children?: any;
  right?: any;
}

export default function MinNavbar({ title, right }: PROPS) {
  const navigation:any = useNavigation();
  return (
    <View
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
      }}
    >
      <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon name="back" size={25} />
          </TouchableOpacity>
          <Text style={{ fontWeight: "600", fontSize: 16, paddingLeft: 15 }}>
            {title}{" "}
          </Text>
        </View>
        {right}
      </View>
    </View>
  );
}
