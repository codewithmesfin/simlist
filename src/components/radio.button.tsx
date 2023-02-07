import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { color, } from '../utils';


interface PROPS{
    selected:any 
    oncheck:(e:any)=>any
    title?:any
}

export default function RadioButton({ selected, oncheck, title }:PROPS) {
    return <TouchableOpacity onPress={oncheck}
        style={{ flexDirection: "row", alignItems: "center", }}
    >
        {selected ? <Ionicons name="radio-button-on-sharp" size={24} color={color.primary} />
            : <Ionicons name="radio-button-off-sharp" size={24} color="grey" />}
        {title ? <Text style={{ paddingLeft: 10, fontSize: 16 }}>{title} </Text> : null}
    </TouchableOpacity>
}