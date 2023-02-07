import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import {
  Feather,
  Entypo,
  AntDesign,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";
import items from "../../data/items";
import { Bottomsheet } from "../../components";
import { color } from "../../utils";

const { width } = Dimensions.get("window");

export default function MyItems(props: any) {
  const sheetItems = [
    {
      title: "Odeeffannoo dabalataa",
      icon: <Feather name="info" size={24} color="black" />,
    },
    {
      title: "Meenu hundaa ilaalaa",
      icon: <AntDesign name="appstore-o" size={24} color="black" />,
    },
    {
      title: "Nyaata wal fakkaatu gurguraa",
      icon: <Entypo name="add-to-list" size={24} color="black" />,
    },
    {
      title: "Menu keessan ilaalaa",
      icon: <Feather name="list" size={24} color="black" />,
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                padding: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: color.light,
                  padding: 6,
                  minHeight: 40,
                  borderRadius: 30,
                  paddingLeft: 20,
                  width: "90%",
                }}
              >
                <EvilIcons name="search" size={24} color="black" />
                <TextInput
                  placeholder="Search"
                  style={{
                    fontSize: 16,
                    paddingLeft: 10,
                    flex: 1,
                  }}
                />
              </View>
              <TouchableOpacity>
                <FontAwesome name="sort-alpha-asc" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {items.map((y: any, j: number) => (
              <TouchableOpacity
                key={j}
                style={{
                  backgroundColor: "white",
                  padding: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: "#edf2f7",
                }}
                onPress={()=>props.navigation.navigate("Item")}
              >
                <View
                  style={{
                    padding: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>
                    {y.title}{" "}
                  </Text>
                  <Bottomsheet items={sheetItems} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                  }}
                >
                  {y.children.map((x: any, i: number) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        width: "49.6%",
                        marginBottom: 5,
                      }}
                      onPress={() =>
                        props.navigation.navigate("Item", {
                          payload: { ...x, category: y.title },
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
                  ))}
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginBottom: 20,
                    marginTop: 5,
                  }}
                  onPress={() =>
                    props.navigation.navigate("Items", { payload: y })
                  }
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      paddingRight: 5,
                    }}
                  >
                    See all
                  </Text>
                  <Entypo name="chevron-thin-right" size={20} color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
