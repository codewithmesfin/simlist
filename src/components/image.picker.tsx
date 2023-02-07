import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo, Fontisto } from "@expo/vector-icons";
import { color } from "../utils";
import { Camera } from "expo-camera";

interface PROPS {
  onSelectOrTake: (e: string) => string;
  canceled: () => void;
}

export default function CustomImagePicker({ onSelectOrTake, canceled }: PROPS) {
  const permisionFunction = async () => {
    const cameraPermission: any = await Camera.requestCameraPermissionsAsync;

    const imagePermission: any =
      await ImagePicker.getMediaLibraryPermissionsAsync();

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      console.log("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      onSelectOrTake(result.assets[0].uri);
    } else canceled();
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      onSelectOrTake(result.assets[0].uri);
    } else canceled();
  };

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          onPress={takeImage}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color.primary,
            borderRadius: 100,
            elevation: 10,
            borderWidth: 2,
            borderColor: color.primary,
            padding: 10,
          }}
        >
          <Entypo name="camera" size={24} color="white" />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 18,
              fontWeight: "600",
              color: "white",
            }}
          >
            Camera
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color.primary,
            borderRadius: 100,
            elevation: 10,
            borderWidth: 2,
            borderColor: color.primary,
            padding: 10,
          }}
        >
          <Fontisto name="photograph" size={24} color="white" />
          <Text
            style={{
              paddingLeft: 20,
              fontSize: 18,
              fontWeight: "600",
              color: "white",
            }}
          >
            Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
