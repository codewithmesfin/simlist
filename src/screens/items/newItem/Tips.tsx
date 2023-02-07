import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { Card } from "../../../components";

const width = Dimensions.get("window").width;

export default function Tips() {
  const items = [
    {
      img: "https://dynaimage.cdn.cnn.com/cnn/w_1200/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210908231436-03-flying-dress-photos-instagram-super-tease.jpg",
      title: "Include Details",
      subtitle:
        "Show the condition of your items by displaying tags, features or defects.",
    },
    {
      img: "https://rukminim1.flixcart.com/image/612/612/kv9urgw0/sling-bag/w/n/q/luispaulza174-sling-bags-654032-za174-sling-bags-654032-sling-original-imag87jdgcdarkgn.jpeg?q=70",
      title: "Show all angles",
      subtitle: "Use multiple photos to capture all sides of your item.",
    },
    {
      img: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/photo_1517336714731_489689fd1ca8_9.jpeg",
      title: "Find a simple background",
      subtitle:
        "Make your item stand out with a light, neutral background free of clutter.",
    },
    {
      img: "https://www.cdc.gov/healthyweight/images/healthy-eating/fruit-veggies-600x300.jpg?_=85239",
      title: "Use natural light",
      subtitle:
        "Find natural light to highlight your item. Avoid flash when possible.",
    },
  ];
  return (
    <View>
      <View style={{ padding: 15,paddingBottom:0 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
            paddingBottom: 5,
          }}
        >
          Take great photo for your listing
        </Text>
        <Text style={{ textAlign: "center" }}>
          You can attract interested buyers with multiple good quantity photos
          that showcase your item.
        </Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
          }}
        >
          {items.map((x:any, i:number) => (
            <View key={i} style={{ width: width - 100,marginRight:20 }}>
              <Card
                children={
                  <View>
                    <Image
                      source={{
                        uri: x.img,
                      }}
                      style={{
                        width: "100%",
                        height: 300,
                        resizeMode: "cover",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    />
                    <View style={{ padding: 20 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          paddingBottom: 5,
                        }}
                      >
                        {x.title}
                      </Text>
                      <Text>{x.subtitle}</Text>
                    </View>
                  </View>
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
