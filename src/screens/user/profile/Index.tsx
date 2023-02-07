import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

import {
  AntDesign,

  Entypo,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import auth from "../../../stores/services/auth.services";
import { Toolbar } from "../../../components";
import { color as constants } from "../../../utils";

export default function Profile(props: any) {
  const [user, setUser] = useState({ full_name: "", email: "" });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let userRaw = await auth.getToken();
    setUser(JSON.parse(`${userRaw}`));
  };

  const lists = [
    {
      title: "Email Address",
      subtitle: "sciemesfin55@gmail.com",
      icon: <Ionicons name="mail-open-outline" size={24} color="black" />,
    },
    {
      title: "Phone Number",
      subtitle: "+251911522902",
      icon: <Feather name="phone" size={24} color="black" />,
    },
    {
      title: "Gender",
      subtitle: "I am Male",
      icon: <Ionicons name="transgender-sharp" size={24} color="black" />,
    },
    {
      title: "Member since",
      subtitle: "January 14, 2023",
      icon: <Ionicons name="md-layers-outline" size={24} color="black" />,
    },

    {
      title: "Address",
      subtitle: "Ethiopia, Addis Ababa, Arada, 4 kilo",
      icon: <Ionicons name="ios-locate" size={24} color="black" />,
    },
  ];
  const signout = () => {
    auth.logout();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Toolbar back />
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 200 }}>
            <View
              style={{
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar.Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU",
                }}
                size={150}
              />
              <Text style={{ fontSize: 25, fontWeight: "700", padding: 10 }}>
                Mesfin Tsegaye
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: constants.primary,
                  elevation: 10,
                  borderRadius: 20,
                  padding: 5,
                  width: 130,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                onPress={() => props.navigation.push("AddItem")}
              >
                <Ionicons name="ios-add-sharp" size={24} color="white" />
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Add Item
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: constants.primary,
                  elevation: 10,
                  borderRadius: 100,
                  padding: 2,
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                padding: 15,
                paddingTop: 25,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginTop: 15,
                  backgroundColor: "gray",
                  padding: 8,
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="emoji-neutral" size={24} color="white" />
              </View>
              <View style={{ paddingLeft: 20, flex: 1 }}>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>
                  Who is Mesfin Tsegaye?
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </Text>
              </View>
            </View>

            <View
              style={{
                padding: 15,
                paddingTop: 5,
                paddingBottom: 25,
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  elevation: 10,
                  borderRadius: 20,
                  padding: 5,
                  width: 140,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: constants.primary,
                  backgroundColor: "white",
                }}
                onPress={() => props.navigation.navigate("MyItems")}
              >
                <Entypo name="list" size={24} color={constants.primary} />
                <Text style={{ color: constants.primary, fontWeight: "700" }}>
                  Your items
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: constants.primary,
                  elevation: 10,
                  borderRadius: 20,
                  padding: 5,
                  width: 140,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                onPress={() => props.navigation.push("AddItem")}
              >
                <Ionicons
                  name="ios-chatbubble-ellipses-outline"
                  size={24}
                  color="white"
                />
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Messages
                </Text>
              </TouchableOpacity>
            </View>

            {lists.map((x, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingBottom: 15,
                    }}
                  >
                    <View style={{ width: 60 }}>{x.icon}</View>
                    <View>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 16,
                          paddingBottom: 6,
                        }}
                      >
                        {x.title}
                      </Text>
                      <Text>{x.subtitle} </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Feather name="edit" size={14} color="black" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "#edf2f7",
                padding: 10,
                paddingLeft: 25,
              }}
              onPress={signout}
            >
              <AntDesign name="logout" size={24} color={constants.red} />
              <Text
                style={{
                  paddingLeft: 40,
                  fontWeight: "600",
                  fontSize: 16,
                  color: constants.red,
                }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
