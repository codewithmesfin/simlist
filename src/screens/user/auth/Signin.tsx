import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, MiniNavbar } from "../../../components";
import { color } from "../../../utils";
import SigninForm from "./components/signin.form";


const { width, height } = Dimensions.get("window");

export default function Signin(props: any) {


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
            <View>
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
            </View>
            <View>
              <SigninForm />
            </View>
            <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>Forgot password? </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
                <Text style={{
                  color: color.primary, fontWeight: "500", fontSize: 16
                }}>Reset now</Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20, }}>
              <View
                style={{
                  paddingBottom: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 2,
                    width: "40%",
                    backgroundColor: "#DDDDDD",
                  }}
                />
                <Text style={{ textAlign: "center", fontWeight: "600" }}>
                  Or
                </Text>
                <View
                  style={{
                    height: 2,
                    width: "40%",
                    backgroundColor: "#DDDDDD",
                  }}
                />
              </View>
              <View
                style={{
                  paddingBottom: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  title="Create new simlist account"
                  onclick={() => props.navigation.navigate("Signup")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
