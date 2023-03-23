import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, MiniNavbar } from "../../../components";
import { color } from "../../../utils";
import SignupForm from "./components/signup.form";



const { width, height } = Dimensions.get("window");

export default function Signup(props: any) {


    return (
        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <MiniNavbar title={"Signin to your account"} />

            <View style={{}}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ padding: 20 }}>
                        {/* <View>
                            <Image
                                source={require("../../../../assets/images/i1.webp")}
                                style={{
                                    minWidth: 330,
                                    maxWidth: 400,
                                    width: "100%",
                                    height: height / 3,
                                    resizeMode: "stretch",
                                }}
                            />
                        </View> */}
                        <View>
                            <SignupForm />
                        </View>
                        <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
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
