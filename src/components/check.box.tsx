import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { color } from '../utils';


interface PROPS{
    selected?:any
    oncheck?: any
    title?:any
    paddingLeft?:number
}
export default function Checkbox({ selected, oncheck, title, paddingLeft }:PROPS) {
    return <TouchableOpacity onPress={oncheck}
        style={{ flexDirection: "row", alignItems: "center", paddingTop: 5, paddingLeft: paddingLeft }}
    >
        {selected ? <AntDesign name="checksquare" size={24} color={color.primary} />
            : <MaterialIcons name="check-box-outline-blank" size={24} color="grey" />}
        {title ? <Text style={{ paddingLeft: 10 }}>{title} </Text> : null}
    </TouchableOpacity>
}
