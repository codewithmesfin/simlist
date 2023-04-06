import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Feather, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

import { Bottomsheet, Filtersheet } from "../../components";
import { color, } from "../../utils";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { constants } from "../../utils";

const { width } = Dimensions.get("window");


const ITEM_QUERY = gql`
  query GetAllItems {
  categories{
    data{
      id
      attributes{
        name
         items {
        data{
          id
        attributes{
          title
          currency
          price
          description
          condition
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
    }
  }
}
`

interface PICTURE {
  id: string
  url?: string
}

interface ITEM {
  id: string
  title?: string
  currency?: string
  price?: number
  description?: string
  condition?: string
  subcategory?: {
    id: string
    name?: string
  }
  marketplace?: {
    id: string
    name?: string
  }
  picture: PICTURE[]
  owner: {
    id: string
    email?: string
    firstName?: string
    lastName?: string
  }
}

interface CATEGORY {
  id: string
  name: string
  items?: ITEM[]
}


export default function HomeScreen(props: any) {
  const sheetItems = [
    {
      title: "Detailed information",
      icon: <Feather name="info" size={24} color="black" />,
    },
    {
      title: "See all items",
      icon: <AntDesign name="appstore-o" size={24} color="black" />,
    },
    {
      title: "Post similar item",
      icon: <Entypo name="add-to-list" size={24} color="black" />,
    },
    {
      title: "See your items",
      icon: <Feather name="list" size={24} color="black" />,
    },
  ];

  const [items, setItems] = useState([])
  const { data, loading, error } = useQuery<any>(
    ITEM_QUERY,
    { variables: {}, }
  );

  // console.log(data?.categories?.data)

  useEffect(() => {
    organizeData(data?.categories?.data)
  }, [loading])


  const organizeData = (arg) => {
    if (!loading && !error) {
      const itemsData:CATEGORY[]=arg.filter(f=>f.attributes.items?.data.length>0).map((cat:any)=>{
        return {
          id:cat.id,
          title:cat.attributes.name,
          items:cat.attributes.items?.data.map((x: any) => {
              return {
                id: x.id,
                title: x?.attributes.title,
                currency: x.attributes.currency,
                price: x.attributes.price,
                condition: x.attributes.condition,
                category: {
                  id: x.attributes.category?.data?.id,
                  name: x.attributes.category?.data?.attributes?.name
                },
                subcategory: {
                  id: x.attributes.subcategory?.data?.id,
                  name: x.attributes.subcategory?.data?.attributes?.name
                },
                marketplace: {
                  id: x.attributes.marketplace?.data?.id,
                  name: x.attributes.marketplace?.data?.attributes?.name
                },
                pictures: x.attributes.pictures?.data.map(p => {
                  return {
                    id: p.id, url: p.attributes.url
                  }
                }),
                owner: {
                  id: x.attributes.owner.data.id,
                  email: x.attributes.owner.data?.attributes.email,
                  firstName: x.attributes.owner.data?.attributes.firstName,
                  lastName: x.attributes.owner.data?.attributes.lastName
                }
              }
            })
        }
      })
      setItems(itemsData)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#edf2f7",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                borderRadius: 30,
                width: "48%",
              }}
              onPress={() => props.navigation.navigate("AddItem")}
            >
              <Feather name="edit" size={20} color="black" />
              <Text
                style={{
                  color: "black",
                  fontWeight: "400",
                  paddingLeft: 5,
                  fontSize: 16,
                }}
              >
                Add Item
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#edf2f7",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                borderRadius: 30,
                width: "48%",
              }}
              onPress={() => props.navigation.navigate("Category")}
            >
              <Feather name="list" size={22} color="black" />
              <Text
                style={{
                  color: "black",
                  fontWeight: "400",
                  paddingLeft: 5,
                  fontSize: 16,
                }}
              >
                Categories
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "white",
              paddingTop: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
              onPress={() => props.navigation.navigate("filterLocation")}
            >
              <MaterialIcons
                name="location-on"
                size={22}
                color={color.primary}
              />
              <Text
                style={{
                  color: color.primary,
                  fontWeight: "500",
                  paddingLeft: 5,
                  fontSize: 16,
                }}
              >
                Nearby Location
              </Text>
              <Entypo
                name="chevron-small-down"
                size={24}
                color={color.primary}
              />
            </TouchableOpacity>
            <View>
              <Filtersheet items={sheetItems} />
            </View>
          </View>

          <View>
            {items.map((y: any, j: number) => (
              <View
                key={j}
                style={{
                  backgroundColor: "white",
                  padding: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: "#edf2f7",
                }}
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
                    {y.title}
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
                  {y.items.map((x: any, i: number) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        width: "49.6%",
                        marginBottom: 5,
                      }}
                      onPress={() =>
                        props.navigation.navigate("Item", {
                          id:x.id,
                        })
                      }
                    >
                      <View style={{ borderWidth: 1, borderColor: "#edf2f7" }}>
                        <Image
                          source={{ uri: `${constants.API_ROOT}${x.pictures[x.pictures.length-1].url}` }}
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
                         {x.currency} {x.price}{" "}
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
                    props.navigation.navigate("Items", { id: y.id,title:y.title })
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
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
