import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { color, constants, jwt } from "../../utils";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
const { width } = Dimensions.get("window");

const CATEGORY_QUERY=gql`
  query getCategories{
  categories{
    data{
      id
      attributes{
        name
        picture{
          data{
            id
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
`

interface CATEGORY {
  id: string
  name: string
}


export default function Category(props: any) {

  const { data, loading, error } = useQuery<any>(
    CATEGORY_QUERY,
    { variables: { }, }
  );

  const rawData=data?.categories?.data

  const [items, setItems] = useState([])
  useEffect(() => {
    organizeData(rawData)
  }, [loading])


  const organizeData = (arg) => {
    if (!loading && !error) {
      const itemsData: CATEGORY[] = arg.map(x => {
        return {
          id:x.id,
          title:x.attributes.name,
          url:`${constants.API_ROOT}${x.attributes?.picture?.data?.attributes.url}`
        }
      })
      setItems(itemsData)
    }
  }



  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
          <View style={{ padding: 15 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {items.map((x, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    borderWidth: 1,
                    borderColor: "#DDDDDD",
                    marginBottom: 10,
                    width: width / 2.2,
                    borderRadius: 5,
                  }}
                  onPress={() =>
                    props.navigation.navigate("Item", {
                      payload: { ...x, category: x.title },
                    })
                  }
                >
                  <View>
                    <Image
                      source={{ uri: x.url }}
                      style={{
                        height: width / 2.7,
                        width: "100%",
                        resizeMode: "cover",
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                      }}
                    />
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text>{x.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
