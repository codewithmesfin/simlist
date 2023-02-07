import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { color as constants } from '../utils'

interface PROPS{
title?:any 
color?:string 
width?:any
onclick?:any 
disabled?:boolean
align?: "auto" | 'justify' |'center'| 'left' |'right'
fontSize?:number |undefined
}
export default function Link({ title,
    color,
    width,
    onclick,
    disabled, align, fontSize
}:PROPS) {
    return disabled ? <View style={{
        padding: 10
    }}>
        <Text style={{
            fontSize: 15,
            fontWeight: "600",
            color: color ? color : "#8080805c",
            textAlign: "center"
        }}>{title} </Text>
    </View> : <TouchableOpacity style={{
        width: width ? width : null,
        padding: 10,
    }} onPress={onclick}>
        <Text style={{
            fontWeight: "700",
            color: color ? color : constants.primary,
            textAlign: align ? align : "justify",
            fontSize: fontSize ? fontSize : undefined
        }}>{title} </Text>
    </TouchableOpacity>
}