import React from 'react';
import { Card } from 'react-native-paper';
import { View } from 'react-native'

interface PROPS{
    children?:any 
    style?:any
}

export default function CustomCard({ children, style }:PROPS) {
    return <View style={{ justifyContent: "flex-start" }}>
        <Card style={[style, {
            backgroundColor: "white",
            elevation: 5,
            borderRadius: 5,
            marginBottom: 5
        }]}>{children ? children : null}</Card>
    </View>;
}