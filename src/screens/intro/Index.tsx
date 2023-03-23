import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { color } from "../../utils";
import { Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const Intro = (props: any) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  const items = [
    {
      title: "Welcome to simlist",
      subtitle: "Lorem Ipsum doler sit amet doler ipsum doler sit amet",
      img: require("../../../assets/images/i1.webp"),
    },
    {
      title: "Visit listed menu",
      subtitle: "Lorem Ipsum doler sit amet doler ipsum doler sit amet",
      img: require("../../../assets/images/i2.webp"),
    },
    {
      title: "Selected your perefernce",
      subtitle: "Lorem Ipsum doler sit amet doler ipsum doler sit amet",
      img: require("../../../assets/images/i3.webp"),
    },
    {
      title: "Place your order",
      subtitle: "Lorem Ipsum doler sit amet doler ipsum doler sit amet",
      img: require("../../../assets/images/i4.webp"),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}
        >
          {items.map((x: any, i: number) => (
            <View
              key={i}
              style={{
                width,
                height: height - 200,
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View>
                <Image source={x.img} style={styles.imageStyle} />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  paddingTop: 50,
                  alignItems: "center",
                }}
              >
                <View style={{ maxWidth: 350 }}>
                  <Text style={styles.header}>{x.title} </Text>
                  <Text style={styles.paragraph}>{x.subtitle}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          padding: 20,
          backgroundColor: "white",
          left: 0,
          right: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 70,
            alignItems: "center"
          }}
        >
          {Array.from(Array(4).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {
                  opacity: pageIndex === index ? 1 : 0.2,
                  height: pageIndex === index ? 15 : 10,
                  width: pageIndex === index ? 15 : 10,

                },
              ]}
              key={index}
            />
          ))}
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: 200,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              padding: 10,
              backgroundColor: color.primary,
            }}
            onPress={() => props.navigation.navigate("Signin")}
          >
            <Entypo name="line-graph" size={24} color="white" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "white",
                paddingLeft: 10,
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  imageStyle: {
    height: height / 2.8,
    width: "100%",
    resizeMode: "contain",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    lineHeight: 30,
  },
  paragraph: {
    fontSize: 20,
    textAlign: "center",
    color: "gray",
    lineHeight: 23,
  },
  paginationWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    borderRadius: 20 / 2,
    backgroundColor: color.primary,
    marginLeft: 10,
  },
});
