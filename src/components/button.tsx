import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { color as constants } from "../utils";


export default function Button({
  title,
  color,
  bgColor,
  width,
  onclick,
  disabled,
  loading,
  borderRadius,
  fontSize,
}:any) {
  return disabled ? (
    <View
      style={{
        borderRadius: borderRadius ? borderRadius : 10,
        backgroundColor: "#8080805c",
        width: width ? width : "100%",
        padding: 12,
      }}
    >
      <Text
        style={{
          fontSize: fontSize ? fontSize : 15,
          fontWeight: "700",
          color: color ? color : "white",
          textAlign: "center",
        }}
      >
        {title}{" "}
      </Text>
    </View>
  ) : (
    <TouchableOpacity
      style={{
        borderRadius: borderRadius ? borderRadius : 10,
        backgroundColor: bgColor ? bgColor : constants.primary,
        width: width ? width : "100%",
        padding: 12,
        elevation: 5,
      }}
      onPress={onclick}
    >
      <Text
        style={{
          fontSize: fontSize ? fontSize : 15,
          fontWeight: "700",
          color: color ? color : "white",
          textAlign: "center",
        }}
      >
        {title}{" "}
      </Text>
      {loading && (
        <ActivityIndicator
          style={{
            alignSelf: "center",
            position: "absolute",
            right: 10,
            top: 10,
          }}
          size={"small"}
          color={"#fff"}
        />
      )}
    </TouchableOpacity>
  );
}
