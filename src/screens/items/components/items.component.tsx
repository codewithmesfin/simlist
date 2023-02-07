import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import items from "../../../data/items";
const { width, height } = Dimensions.get('window');

export default function ItemsComponent(props: any) {
    const navigation = useNavigation<any>()
    const myItems = items.filter(f => f.title === props.category).map(x => x.children).flat()
  
    return <View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {
                myItems.map((x:any, i:number) => <TouchableOpacity key={i}
                    style={{
                        width: '49%', marginBottom: 5,
                    }}
                    onPress={() => {
                        navigation.pop()
                        navigation.push("Item", { payload: { ...x, category: props.category } })
                    }}
                >
                    <View style={{ borderWidth: 1, borderColor: "#edf2f7", }}>
                        <Image source={{ uri: x.img }}
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