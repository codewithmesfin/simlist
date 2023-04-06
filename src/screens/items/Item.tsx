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
  TextInput,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { color, constants, formatter } from "../../utils";
import { Button, Card, Toolbar } from "../../components";
import { Avatar } from "react-native-paper";
import ItemsComponent from "./components/items.component";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
const { width } = Dimensions.get("window");



const ITEM_QUERY = gql`
query getItem($id:ID!){
  item(id:$id){
    data{
      id
      attributes{
          title
          currency
          price
          description
          condition
          category{
            data{
              id
              attributes{
                name
              }
            }
          }
          subcategory{
            data{
              id 
              attributes{
                name
              }
            }
          }
          marketplace{
            data{
              id
              attributes{
                name
              }
            }
          }
          pictures{
            data{id
            attributes{
              url
            }
            }
          }
          owner{
            data{
              id
              attributes{
               email
                firstName
                lastName
              }
            }
          }
        }
    }
  }
}
`

interface PICTURE {
  id: string
  url?: string
}

interface CATEGORY {
  id: string
  name: string
}


interface ITEM {
  id: string
  title?: string
  currency?: string
  price?: number
  description?: string
  condition?: string
  category?: CATEGORY,
  subcategory?: {
    id: string
    name?: string
  }
  marketplace?: {
    id: string
    name?: string
  }
  pictures: PICTURE[]
  owner: {
    id: string
    email?: string
    firstName?: string
    lastName?: string
  }
}





export default function Item(props: any) {
  const { id } = props.route.params;


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



  const { data, loading, error } = useQuery<any>(
    ITEM_QUERY,
    { variables: { id: id }, }
  );



  const rawData = data?.item?.data


  const [item, setItem] = useState<any>({ pictures: [] })
  useEffect(() => {
    organizeData(rawData)
  }, [loading])

  const organizeData = (arg) => {

    if (!loading && !error) {

      const itemData: ITEM = {
        id: arg.id,
        title: arg.attributes.title,
        currency: arg.attributes.currency,
        price: arg.attributes.price,
        condition: arg.attributes.condition,
        category: {
          id: arg.attributes.category?.data?.id,
          name: arg.attributes.category?.data?.attributes?.name
        },
        subcategory: {
          id: arg.attributes.subcategory?.data?.id,
          name: arg.attributes.subcategory?.data?.attributes?.name
        },
        marketplace: {
          id: arg.attributes.marketplace?.data?.id,
          name: arg.attributes.marketplace?.data?.attributes?.name
        },
        pictures: arg.attributes.pictures?.data && arg.attributes.pictures?.data.length > 0
          ? arg.attributes.pictures?.data.map(p => {
            return {
              id: p.id, url: p.attributes.url
            }
          }) : [],
        owner: {
          id: arg.attributes.owner.data.id,
          email: arg.attributes.owner.data?.attributes.email,
          firstName: arg.attributes.owner.data?.attributes.firstName,
          lastName: arg.attributes.owner.data?.attributes.lastName
        }
      }
      // console.log(itemData)
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
          <View style={{ paddingBottom: 200 }}>
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
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        props.navigation.navigate("ItemImage", {
                          images: item.pictures.map(image => {
                            return {
                              img: `${constants.API_ROOT}${image.url}`
                            }
                          }),
                          title: item.title,
                        })
                      }
                    >

                      <ImageBackground
                        source={{ uri: `${constants.API_ROOT}${x.url}` }}
                        resizeMode="cover"
                        style={{
                          height: width,
                          width: width,
                        }}
                      >
                        {item?.pictures.length > 1 && <View
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
                              {
                                Array.from(Array(item?.pictures.length).keys()).map(
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
                        </View>}
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{ paddingTop: 10 }}>
                <View style={styles.paginationWrapper}>
                  {Array.from(Array(item?.pictures.length).keys()).map(
                    (_key, index) => (
                      <View
                        style={[
                          styles.paginationDots,
                          { opacity: pageIndex === index ? 1 : 0.2 },
                        ]}
                        key={index}
                      />
                    )
                  )}
                </View>
                <View style={{ padding: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "800", fontSize: 22 }}>
                      {item.title}{" "}
                    </Text>
                    <Text style={{ fontWeight: "800", fontSize: 16 }}>
                      {item?.condition}
                    </Text>
                  </View>
                  <Text style={{ fontWeight: "800", fontSize: 16 }}>
                    {item.currency}  {formatter.number(item.price)}{" "}
                  </Text>
                  <Text
                    style={{ color: "grey", fontSize: 15, fontWeight: "600" }}
                  >
                    Listed yesterday on Woreda 06, Addis Ababa.
                  </Text>
                </View>
                <View style={{ padding: 15 }}>
                  <Card
                    style={{ padding: 15 }}
                    children={
                      <View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Ionicons
                            name="ios-chatbubble-ellipses"
                            size={24}
                            color={color.primary}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "700",
                              paddingLeft: 10,
                            }}
                          >
                            Send seller a message
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 20,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: color.light,
                              padding: 12,
                              borderRadius: 30,
                              marginRight: 10,
                            }}
                          >
                            <TextInput
                              value="Hi, Is this still available?"
                              style={{ fontWeight: "700", paddingLeft: 10 }}
                              multiline
                            />
                          </View>
                          <View>
                            <Button title="Send" />
                          </View>
                        </View>
                      </View>
                    }
                  />
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
                          backgroundColor: color.light,
                          justifyContent: "center",
                          height: 50,
                          width: 50,
                          borderRadius: 50 / 2,
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="favorite"
                          size={24}
                          color="black"
                        />
                      </View>
                      <Text
                        style={{ fontSize: 18, fontWeight: "800", padding: 10 }}
                      >
                        Save
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: "800" }}>
                    Seller Information
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: color.primary,
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      Seller Details
                    </Text>
                  </TouchableOpacity>
                </View>
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
                          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_cSRnL4eLGTwEt0rBym1y_PTjpeSTwtOH0HFR4FXaBS_dAH58X2UupBiHYesQHe5Qd88&usqp=CAU",
                        }}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 22, fontWeight: "800" }}>
                        John Doe
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
                  <TouchableOpacity>
                    <Ionicons name="ios-call" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
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
                  {item.description}{" "}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "800", fontSize: 22 }}>
                    Sell similar item{" "}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    Add your item to Simlist listing{" "}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#DDDDDD",
                    padding: 10,
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    elevation: 10,
                  }}
                  onPress={() => props.navigation.navigate("AddItem")}
                >
                  <Text style={{ fontSize: 18, fontWeight: "800" }}>
                    Add Item
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderTopWidth: 2,
                  borderTopColor: "#DDDDDD",
                  padding: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: "800" }}>
                    Similar Items
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: color.primary,
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ paddingTop: 20 }}>
                {!loading && !error &&  <ItemsComponent category={{id:item?.category?.id}} />}
                </View>
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
