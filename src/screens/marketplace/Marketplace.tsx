import React, { useEffect, useState } from "react";

import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Linking,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { color, constants, } from "../../utils";
import { Toolbar } from "../../components";
import { Avatar } from "react-native-paper";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
const { width } = Dimensions.get("window");


interface PICTURE {
  id: string
  url?: string
}

interface OWNER {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: PICTURE
}

interface MARKETPLACE {
  id: string
  name: string
  description?: string
  location?: string
  address?: string
  email: string
  phone: string
  pictures: PICTURE[]
  owner: OWNER
}


const MARKETPLACE_QUERY = gql`
  query getMarketplace($id:ID!){
   marketplace(id:$id){
    data{
      id
       attributes{
              name
              location
              address
              description
              email
              phone
              pictures{
                data{
                  id
                  attributes{
                    url
                  }
                }
              }
        owner{
          data{
            id
            attributes{
              firstName
              lastName
              email
              phone
              avatar{
                data{
                  id
                  attributes{url}
                }
              }
            }
          }
        }
            }

    }
  }
}
`


export default function Marketplace(props: any) {



  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const setSliderPage = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
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


  const { id } = props.route.params

  const [item, setItem] = useState<any>({ pictures: [] })
  const { data, loading, error } = useQuery<any>(
    MARKETPLACE_QUERY,
    {
      variables: {
        id: id
      },
    }
  );


  const rawData = data?.marketplace?.data



  useEffect(() => {
    organizeData(rawData)
  }, [loading])


  const organizeData = (arg) => {
    if (!loading && !error) {
      const itemData: MARKETPLACE = {
        id: arg.id,
        name: arg.attributes.name,
        description: arg.attributes.description,
        location: arg.attributes.location,
        address: arg.attributes.address,
        email: arg.attributes.email,
        phone: arg.attributes.phone,
        pictures: arg.attributes.pictures.data.map((p: any) => {
          return {
            id: p.id, url: `${constants.API_ROOT}${p.attributes.url}`
          }
        }),
        owner: {
          id: arg.attributes.owner.data.id,
          firstName: arg.attributes.owner.data.attributes.firstName,
          lastName: arg.attributes.owner.data.attributes.lastName,
          email: arg.attributes.owner.data.attributes.email,
          phone: arg.attributes.owner.data.attributes.phone,
          avatar: arg.attributes.owner.data.attributes.avatar.data.map(a => {
            return {
              id: a.id, url: `${constants.API_ROOT}${a.attributes.url}`
            }
          }),
        }
      }

      setItem(itemData)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View>
        <Toolbar
          search={() => props.navigation.navigate("Search")}
          profile={() => props.navigation.navigate("Profile")}
          back
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 100 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <View>
                <ScrollView
                  horizontal={true}
                  style={{
                    top: 0,
                    height: width,
                    width: width,
                  }}
                  scrollEventThrottle={16}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onScroll={(event) => {
                    setSliderPage(event);
                  }}
                >
                  {item.pictures.map((x: any, i: number) => (
                    <ImageBackground
                      key={i}
                      source={{ uri: x.url }}
                      resizeMode="cover"
                      style={{
                        height: width,
                        width: width,
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          bottom: 10,
                          left: 0,
                          right: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "grey",
                            padding: 5,
                            minWidth: 50,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "grey",
                          }}
                        >
                          <View style={styles.paginationWrapper}>
                            {Array.from(Array(item.pictures.length).keys()).map(
                              (_key, index) => (
                                <View
                                  style={[
                                    styles.paginationDots,
                                    {
                                      opacity: pageIndex === index ? 1 : 0.2,
                                    },
                                  ]}
                                  key={index}
                                />
                              )
                            )}
                          </View>
                        </View>
                      </View>
                    </ImageBackground>
                  ))}
                </ScrollView>
              </View>
              <View style={{ paddingTop: 10 }}>

                <View style={{ padding: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "800", fontSize: 22 }}>
                      {item.name}{" "}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                      <TouchableOpacity style={{ marginRight: 10 }} onPress={() =>
                        Linking.openURL(`tel:${item.phone}`)
                      }>
                        <Ionicons name="ios-call" size={24} color={color.primary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => Linking.openURL(`sms:${item.phone}`)}>
                        <MaterialIcons name="message" size={28} color={color.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={{ fontWeight: "800", fontSize: 16 }}>
                    {item.location}
                  </Text>
                  <Text
                    style={{ color: "grey", fontSize: 15, fontWeight: "600" }}
                  >
                    Listed yesterday on Woreda 06, Addis Ababa.
                  </Text>
                </View>

                <View style={{ padding: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: color.light,
                          justifyContent: "center",
                          height: 50,
                          width: 50,
                          borderRadius: 50 / 2,
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="ios-notifications"
                          size={24}
                          color="black"
                        />
                      </View>
                      <Text
                        style={{ fontSize: 18, fontWeight: "800", padding: 10 }}
                      >
                        Alert
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: color.light,
                          justifyContent: "center",
                          height: 50,
                          width: 50,
                          borderRadius: 50 / 2,
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons name="report" size={24} color="black" />
                      </View>
                      <Text
                        style={{ fontSize: 18, fontWeight: "800", padding: 10 }}
                      >
                        Report
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: color.primary,
                          justifyContent: "center",
                          height: 50,
                          width: 50,
                          borderRadius: 50 / 2,
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="restaurant-menu"
                          size={24}
                          color={"white"}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "800",
                          padding: 10,
                          color: color.primary,
                        }}
                      >
                        Menu
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: color.light,
                          justifyContent: "center",
                          height: 50,
                          width: 50,
                          borderRadius: 50 / 2,
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome5 name="share" size={24} color="black" />
                      </View>
                      <Text
                        style={{ fontSize: 18, fontWeight: "800", padding: 10 }}
                      >
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: "800" }}>
                  Contact Information
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 20,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ paddingRight: 10 }}>
                      <Avatar.Image
                        size={50}
                        source={{
                          uri:
                            item?.owner?.avatar.length > 0 ?
                              item?.owner?.avatar[item?.owner?.avatar.length - 1].url
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_cSRnL4eLGTwEt0rBym1y_PTjpeSTwtOH0HFR4FXaBS_dAH58X2UupBiHYesQHe5Qd88&usqp=CAU",
                        }}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "800" }}>
                        {item?.owner?.firstName}   {item?.owner?.lastName}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialIcons
                          name="verified"
                          size={18}
                          color={color.primary}
                        />
                        <Text style={{ paddingLeft: 5 }}>Verified user</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.owner.phone}`)}>
                    <Ionicons name="ios-call" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL(`sms:${item.owner.phone}`)}>
                    <MaterialIcons name="message" size={28} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="chatbubble-ellipses"
                      size={28}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ padding: 15 }}>
                <Text
                  style={{ fontSize: 22, fontWeight: "800", lineHeight: 40 }}
                >
                  Description
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paginationWrapper: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 6,
    width: 6,
    borderRadius: 7 / 2,
    backgroundColor: "white",
  },
});
