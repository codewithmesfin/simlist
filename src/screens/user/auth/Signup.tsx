import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, MiniNavbar } from "../../../components";
import { color } from "../../../utils";
import SignupForm from "./components/signup.form";



const { width, height } = Dimensions.get("window");

export default function Signup(props: any) {

    return (
        <View
            style={{ backgroundColor: "white", flex: 1, }}>
            <MiniNavbar title={"Signin to your account"} />
            <View style={{ paddingTop: 30 }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ padding: 20 }}>

                        <View>
                            <SignupForm />
                        </View>
                        <View style={{
                            padding: 12, 
                            paddingTop: 40,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Signin")}>
                                <Text style={{
                                    color: color.primary, fontWeight: "500", fontSize: 16
                                }}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
