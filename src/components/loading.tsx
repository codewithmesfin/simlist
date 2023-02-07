import React from 'react'
import { ActivityIndicator, View } from 'react-native'

interface PROPS{
    size?:number | undefined
    color?:string | undefined
}
export default function Loading({ size, color }:PROPS) {
    return <View style={{
        flex: 1,
        justifyContent: "center"
    }}>
        <ActivityIndicator size={size ? size : "large"} color={color ? color : '#2196f3'} />
    </View>
}