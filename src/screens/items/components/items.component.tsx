import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { constants } from "../../../utils";

const { width } = Dimensions.get('window');



const ITEM_QUERY = gql`
 query getCategory($id:ID!){
  category(id:$id){
    data{
      id
      attributes{
        name
         items{
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
              }
            }
          }
        }
        }
        }}
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
    title: string
    items?: ITEM[]
  }

  
export default function ItemsComponent(props: any) {
    const navigation = useNavigation<any>()

   



  const [item, setItem] = useState<any>({items:[]})
  const { data, loading, error } = useQuery<any>(
    ITEM_QUERY,
    { variables: {id:props.category.categoryId}, }
  );

//   console.log(data?.category?.data)

  useEffect(() => {
    organizeData(data?.category?.data)
  }, [loading])


  const organizeData = (arg) => {
    if (!loading && !error) {
        // console.log(arg)
      const itemsData:CATEGORY={
        id:arg.id,
        title:arg.attributes.name,
        items:arg.attributes.items?.data.map((x: any) => {
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
      console.log(itemsData)
      setItem(itemsData)
    }
  }


    return <View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {
                item.items.map((x: any, i: number) => <TouchableOpacity key={i}
                    style={{
                        width: '49%', marginBottom: 5,
                    }}
                    onPress={() => {
                        navigation.pop()
                        navigation.push("Item", { payload: { ...x, category: props.category } })
                    }}
                >
                    <View style={{ borderWidth: 1, borderColor: "#edf2f7", }}>
                        <Image source={{ uri:  `${constants.API_ROOT}${x.pictures[x.pictures.length-1].url}` }}
                            style={{ height: width / 2.2, width: '100%', resizeMode: 'cover' }}
                        />
                    </View>
                    <View style={{
                        padding: 15, width: "100%", paddingTop: 10
                    }}>
                        <Text numberOfLines={1} ellipsizeMode='tail'
                            style={{ fontSize: 13, fontWeight: "700" }}
                        >{x.title} </Text>
                        <Text>{x.price} </Text>
                    </View>
                </TouchableOpacity>)
            }
        </View>
    </View>
}