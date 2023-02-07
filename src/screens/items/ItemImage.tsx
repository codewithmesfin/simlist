import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { color, constants } from "../../utils";

const { width, height } = Dimensions.get("window");

export default function ItemImage(props: any) {
  const { images, title } = props.route.params;
  const [currentImage, setCurrentImage] = useState({src:'',index:0});

  useEffect(() => setCurrentImage({src:images[0].img,index:0}), []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.pop()}>
          <Text
            numberOfLines={1}
            style={{
              color: color.primary,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>{title} </Text>
        <View>
        <Text style={{ color: color.primary, fontSize: 18, fontWeight: "700" }}>Picture  {currentImage.index+1} </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ height: height - width,width:width }}>
          <Image
            source={{ uri: currentImage.src }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            position: "relative",
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
                  borderWidth: 1,
                  borderColor:
                    currentImage === x.img ? color.primary : "#edf2f7",
                  borderRadius: 5,
                  padding: 5,
                  width: width / 3.5,
                }}
                onPress={() => setCurrentImage({...currentImage,src:x.img,index:i})}
              >
                <Image
                  source={{ uri: x.img }}
                  style={{
                    width: "100%",
                    height: 60,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
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
