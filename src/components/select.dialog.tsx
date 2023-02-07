
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import {
    Entypo, FontAwesome
} from '@expo/vector-icons';
import RadioButton from './radio.button';



const SelectDialog = (props: any) => {

    const [visible, setVisible] = useState(props.open);

    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    return (
        <View>
            {props.btn ? props.btn :
                <TouchableOpacity style={{
                    flexDirection: "row", justifyContent: "space-between",
                    alignItems: "center", borderWidth: 1.2, borderColor:props.borderColor?props.borderColor: "grey",
                    height: 55, borderRadius: 5, padding: 15
                }} onPress={toggleBottomNavigationView}>
                    <Text style={{ fontSize: 16, color:props.titleColor?props.titleColor: "grey", fontWeight: "400",textTransform:"capitalize"}}> {props.title ? props.title : "Title"} </Text>
                    <FontAwesome name="sort-down" size={24} color="black" />
                </TouchableOpacity>
            }

            <View style={styles.container}>

                <BottomSheet
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                >
                    <View style={[styles.bottomNavigationView, { height: props.height ? props.height : null,}]}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',paddingBottom:100
                            }}>
                            <View style={{ alignItems: "center" }}>
                                <TouchableOpacity style={{
                                    height: 5,
                                    backgroundColor: "grey",
                                    borderRadius: 30, width: 50, marginBottom: 10
                                }} onPress={toggleBottomNavigationView}></TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: "row", alignItems: "center",
                                justifyContent: "space-between", paddingBottom: 20, marginTop: 10
                            }}>
                                <TouchableOpacity onPress={toggleBottomNavigationView}>
                                    <Entypo name="chevron-left" size={30} color="black" />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 16, fontWeight: "500" }}>Select {props.title ? props.title : null} </Text>

                            </View>

                            <View>
                                <ScrollView showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false} >
                                    <View >
                                        {
                                            props.items ?
                                                props.items.map((x:any, i:number) => <TouchableOpacity  key={i} onPress={()=>{props.onselect(x)
                                                    toggleBottomNavigationView()
                                                }}  style={{
                                                    padding: 10,flexDirection:"row",alignItems:"center",justifyContent:"flex-start"
                                                }}>
                                                    <View style={{width:40}}>
                                                    {x.icon?x.icon:<RadioButton
                                                     oncheck={() => {
                                                            props.onselect(x);
                                                            toggleBottomNavigationView();
                                                        } } selected={undefined}  /> }
                                                    </View>
                                                   <Text style={{paddingLeft:10,fontSize:18,fontWeight:"500"}}>{x.title} </Text>
                                                </TouchableOpacity>)
                                                : <Text>No Option</Text>
                                        }
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </BottomSheet>
            </View >
        </View >
    );
};

export default SelectDialog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0F7FA',

    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%', height: '80%',
        justifyContent: 'center',
        padding: 15, borderTopEndRadius: 10,
        borderTopLeftRadius: 10
    },
});