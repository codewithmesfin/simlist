import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Icon } from ".";
import { color } from "../utils";


interface PROPS {
  title?: string;
  subtitle?: string;
  btnText?: string;
  onBtnClick: () => void;
  open: boolean;
  children?: any;
  type?: string
  permanent?: boolean,
  navigate?: string
}
export default function SimpleModal({
  title,
  subtitle,
  onBtnClick,
  open,
  type,
  permanent,
  btnText,
  navigate
}: PROPS) {

  const navigation: any = useNavigation()


  return open && (
    <View style={{
      position: "absolute",
      bottom: 0,
      top: 0, left: 0, right: 0,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "transparent",
    }}>
      <View style={{
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 16.0,
        elevation: 24,
        padding: 20,
        backgroundColor: 'white',
        left: 1, right: 1,
        borderRadius: 30,
        height: 300,
        flexDirection: "column",
        justifyContent: "center",
        width: '100%',
        borderWidth: 1, borderColor: "#DDDDDD"
      }}>
        <View >
          <View style={{ padding: 10 }}>
            {title && (
              <Text style={{
                fontSize: 20, color:
                  type === "error" ? 'red'
                    : type === "success" ? 'green'
                      : type === "info" ? color.primary
                        : type === "danger" ? 'orange'
                          : color.primary,
                fontWeight: "700",
                textAlign: "center",
              }}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={{ fontSize: 16, color: "#666666", paddingTop: 10, textAlign: "center", }}>
                {subtitle}
              </Text>
            )}
          </View>
          <View style={{ padding: 30 }}>
            <Button title={btnText ? btnText : "Continue"} onclick={() => {
              onBtnClick()
              navigation.navigate(navigate)
            }}
              borderRadius={30}
              bgColor={type === "error" ? 'red'
                : type === "success" ? 'green'
                  : type === "info" ? color.primary
                    : type === "danger" ? 'orange'
                      : color.primary}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
