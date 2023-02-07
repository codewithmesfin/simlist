import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Loading, Toolbar } from "../../components";
import { EvilIcons } from "@expo/vector-icons";
import {color as  constants } from "../../utils";
import items from "../../data/items";
const { width, height } = Dimensions.get("window");

export default function Search(props: any) {
  const [item, setItem] = useState({
    loading: true,
    data: [],
    error: "",
  });

  const flatenItems: any = items.map((y: any) =>
  y.children.map((x: any) => {
    return {
      category: y.title,
      ...x,
    };
  })
).flat();
  useEffect(() => {
   
    //   console.log(flatenItems.map(x=>x.title))
    setItem({ ...item, loading: false, data: flatenItems });
  }, []);

  const search = (e: string) => {
    if (e.length > 3) {
      setItem({ ...item, loading: true });
      const data =flatenItems.filter((f: any) =>
        changeToLower(f.title).includes(changeToLower(e)) ||   changeToLower(f.category).includes(changeToLower(e))
      );
      setItem({ ...item, loading: false, data: data });
    }
  };

  const changeToLower = (text: string) => `${text}`.toLocaleLowerCase();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Toolbar back />
      <View
        style={{
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: constants.light,
            padding: 6,
            minHeight: 40,
            borderRadius: 30,
            paddingLeft: 20,
            width: "100%",
          }}
        >
          <EvilIcons name="search" size={24} color="black" />
          <TextInput
            placeholder="Search Item, category, marketplace..."
            style={{
              fontSize: 16,
              paddingLeft: 10,
              flex: 1,
            }}
            onChangeText={(e) => search(e)}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {item.loading ? (
              <View
                style={{
                  flex: 1,
                  height: height / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading />
              </View>
            ) : item.data.length <= 0 ? (
              <View
                style={{
                  flex: 1,
                  height: height / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ padding: 10 }}>
                  <Image
                    source={require("../../../assets/images/logo.png")}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
                <Text style={{ fontSize: 30, color: "grey" }}>
                  Result found
                </Text>
              </View>
            ) : (
              item.data.map((x: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    width: "49.6%",
                    marginBottom: 5,
                  }}
                  onPress={() =>
                    props.navigation.navigate("Item", {
                      payload: x,
                    })
                  }
                >
                  <View style={{ borderWidth: 1, borderColor: "#edf2f7" }}>
                    <Image
                      source={{ uri: x.img }}
                      style={{
                        height: width / 2.2,
                        width: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      padding: 15,
                      width: "100%",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "800", fontSize: 18 }}>
                      {x.price}{" "}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontWeight: "700",
                        fontSize: 14,
                        lineHeight: 20,
                      }}
                    >
                      {x.title}{" "}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontWeight: "500",
                        color: "grey",
                        fontSize: 11,
                      }}
                    >
                      {x.location ? x.location : "Addis Ababa, Ethiopia"}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
