import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Bottomsheet, Icon } from "../../components";
import { color } from "../../utils";


const { width } = Dimensions.get("window");

export default function ItemImage(props: any) {
  const { images, title } = props.route.params;
  const [currentImage, setCurrentImage] = useState({ src: '', index: 0 });

  useEffect(() => setCurrentImage({ src: images[0].img, index: 0 }), []);


  const sheetItems = [
    {
      title: "Report this picture",
      icon: <Icon name="report" size={25} color={color.primary} />
    },
    {
      title: "Save this picture",
      icon: <Icon name="save" size={25} color={color.primary} />
    },
  ];

  return <View
    style={{
      flex: 1,
      backgroundColor: "white",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <ImageBackground
      source={{ uri: currentImage.src }}
      resizeMode="contain"
      style={{
        height:'100%',
        width: width,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0, padding: 10
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Icon name="back" size={25} color={color.primary} />
          </TouchableOpacity>
          <Bottomsheet items={sheetItems} height={100} />
        </View>
      </View>
    </ImageBackground>
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {images.map((x: any, i: number) => (
          <TouchableOpacity
            key={i}
            style={{
              borderWidth: currentImage.index === i ? 1 : 0,
              borderColor:
                color.primary,
              borderRadius: 5,
              padding: 5,
              width: width / 3.5,
            }}
            onPress={() => setCurrentImage({ ...currentImage, src: x.img, index: i })}
          >
            <Image
              source={{ uri: x.img }}
              style={{
                width: "100%",
                height: 60,
                resizeMode: "cover",
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  paginationWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 7,
    width: 7,
    borderRadius: 7 / 2,
    backgroundColor: color.primary,
    marginLeft: 10,
  },
});
