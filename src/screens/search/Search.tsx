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
import { color, constants } from "../../utils";
import items from "../../data/items";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
const { width, height } = Dimensions.get("window");


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
  category?: {
    id: string
    name?: string
  },
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

const ITEM_QUERY = gql`
 query GetAllItems {
      items {
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

export default function Search(props: any) {
  const [cachedData, setCacheData] = useState([])

  const [items, setItems] = useState([])

  const { data, loading, error } = useQuery<any>(
    ITEM_QUERY,
    { variables: { id: props?.category?.id }, }
  );

  const rawData = data?.items?.data

  useEffect(() => {
    organizeData(rawData)
  }, [loading])


  const organizeData = (arg) => {
    if (!loading && !error) {

      const itemsData: ITEM[] = arg.map((x, i) => {
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
      setItems(itemsData)
      setCacheData(itemsData)
    }
  }




  const search = (e: string) => {
    if (e.length > 1) {
      const dataItems = cachedData.filter(f => (changeToLower(f.title)).includes(changeToLower(e))
        || (changeToLower(f.category.name)).includes(changeToLower(e)))
      setItems(dataItems)
    }
    else setItems(cachedData)
  };

  const changeToLower = (text: string) => `${text}`.toLowerCase();

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
            backgroundColor: color.light,
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
            {loading ? (
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
            ) : items.length <= 0 ? (
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
              items.map((x: any, i: number) => (
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
                      source={{ uri: `${constants.API_ROOT}${x.pictures[x.pictures.length - 1].url}` }}
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
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
