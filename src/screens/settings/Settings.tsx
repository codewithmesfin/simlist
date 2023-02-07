import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { auth } from "../../services";
import { AuthContext } from "../../utils/context";
import { Button, Toolbar } from "../../components";
import { constants } from "../../utils";
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
  Ionicons,
} from "@expo/vector-icons";

export default function Setttings(props: any) {
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
      title: "View homepage",
      route: "Home",
      icon: <AntDesign name="home" size={24} color="black" />,
    },
    {
      title: "Item categories",
      route: "Category",
      icon: <Entypo name="list" size={24} color="black" />,
    },
    {
      title: "View your items",
      route: "MyItems",
      icon: <Feather name="list" size={24} color="black" />,
    },
    {
      title: "Add your item to Simlist",
      route: "AddItem",
      icon: <MaterialIcons name="playlist-add" size={24} color="black" />,
    },
    {
      title: "Nearby Marketplaces",
      route: "Marketplaces",
      icon: <Ionicons name="md-layers-outline" size={24} color="black" />,
    },
    {
      title: "Update personal information",
      route: "UpdateProfile",
      icon: <FontAwesome5 name="user-edit" size={24} color="black" />,
    },
    {
      title: "Change your password",
      route: "ChangePassword",
      icon: <MaterialIcons name="security" size={24} color="black" />,
    },
    {
      title: "Messages or Inboxes",
      route: "Chat",
      icon: (
        <Ionicons name="ios-chatbox-ellipses-outline" size={24} color="black" />
      ),
    },
    {
      title: "Customer Support",
      route: "Support",
      icon: (
        <Ionicons
          name="ios-chatbubble-ellipses-outline"
          size={24}
          color="black"
        />
      ),
    },
  ];
  const { signoutContext } = React.useContext(AuthContext);
  const signout = () => {
    auth.logout();
    signoutContext();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Toolbar back />
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{paddingBottom:200}}> 
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
                  marginTop: 15,marginBottom:50,
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
                <Text style={{ fontSize: 17, fontWeight: "700" }}>
                  Who is Mesfin Tsegaye?
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </Text>
              </View>
            </View>

            {lists.map((x, i) => (
              <View key={i}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 20,paddingTop:15,paddingBottom:10,
                    // borderBottomWidth: 1,
                    borderColor: "#edf2f7",
                  }}
                >
                 <View style={{width:60}}>
                 {x.icon}
                 </View>
                  <Text
                    style={{ fontWeight: "600" }}
                  >
                    {x.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
             <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "#edf2f7",margin:20
                  }}
                  onPress={signout}
                >
               <View style={{width:60}}>
                <Ionicons name="ios-locate" size={24} color="black" />
                </View>
                  <View>
                  <Text
                    style={{  fontWeight: "600", fontSize: 16,paddingBottom:6}}
                  >
                Address
                  </Text>
                  <Text>
                  Ethiopia, Addis Ababa, Arada, 4 kilo
                  </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "#edf2f7",margin:20
                  }}
                  onPress={signout}
                >
                 <AntDesign name="logout" size={24} color={constants.red} />
                  <Text
                    style={{ paddingLeft: 40, fontWeight: "600", fontSize: 16,color:constants.red }}
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
