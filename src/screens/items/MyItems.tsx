import React, { useEffect, useState } from "react";
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

import { Bottomsheet } from "../../components";
import { color, constants, groupData, jwt } from "../../utils";
import { useAuth } from "../../context/auth.context";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const { width } = Dimensions.get("window");

const ITEM_QUERY = gql`
  query myItems($id:ID!){
usersPermissionsUser(id: $id){
    data{
      id
      attributes{
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
              attributes{name}
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
                location
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
  const { token } = useAuth();

  const decodedAccessToken: any = jwt.decode(token)
  // console.log(decodedAccessToken)

  const { data, loading, error } = useQuery<any>(
    ITEM_QUERY,
    { variables: { id: decodedAccessToken.id }, }
  );

  const rawData = data?.usersPermissionsUser?.data?.attributes?.items?.data


  const [items, setItems] = useState([])
  useEffect(() => {
    organizeData(rawData)
  }, [loading])


  const organizeData = (arg) => {
    if (!loading && !error) {
      const itemsData: CATEGORY[] = arg.map(x => {
        return {
          id: x.id,
          title: x?.attributes.title,
          currency: x.attributes.currency,
          price: x.attributes.price,
          condition: x.attributes.condition,
          categoryId: x.attributes.category?.data?.id,
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
      setItems(groupData.group(itemsData))
    }
  }

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
                onPress={() => props.navigation.navigate("Item")}
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
                  {y.items.map((x: any, i: number) => (
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
                    props.navigation.navigate("Items", { id: y.id })
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
