import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import {
  FontAwesome,
  EvilIcons,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";
import { color } from "../../utils";
import marketplaces from "../../data/marketplaces";

export default function Marketplaces(props: any) {

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{paddingBottom:100}}>
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
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              {marketplaces.map((x: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    paddingLeft: 15,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => props.navigation.navigate("Marketplace", { payload:x })}
                >
                  <View>
                    <Image source={{uri:x.img}} style={{
                      height: 100,
                      width: 100,
                      resizeMode: "cover",
                      borderRadius: 5,
                    }} />
                    </View>
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: marketplaces.length - 1 > i ? 1 : 0,
                      borderBottomColor: "#edf2f7",
                      paddingBottom: 15,
                      paddingTop:15,
                      marginLeft: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "700",
                      }}
                    >
                      {x.title}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 5,
                      }}
                    >
                      <MaterialIcons
                        name="email"
                        size={16}
                        color={color.primary}
                      />
                      <Text
                        style={{ paddingLeft: 10 }}
                      >
                        {x.email}{" "}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 8,
                      }}
                    >
                      <MaterialIcons
                        name="local-phone"
                        size={18}
                        color={color.primary}
                      />
                      <Text
                        style={{ paddingLeft: 10, }}
                      >
                        {x.phone}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 5,
                      }}
                    >
                      <MaterialIcons
                        name="location-pin"
                        size={20}
                        color={color.success}
                      />
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: "black",
                          fontWeight: "700",fontSize:12
                        }}
                      >
                        {x.location}{" "}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          borderTopWidth: 1,
          borderTopColor: "#DDDDDD",
          left: 0,
          right: 0,
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 30,
            padding: 10,
            backgroundColor: "#2196f3",
            elevation: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => props.navigation.navigate("AddMarketplace")}
        >
          <Foundation name="page-edit" size={24} color="white" />
          <Text style={{ color: "white", paddingLeft: 10 }}>
         Add your Marketplace
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
