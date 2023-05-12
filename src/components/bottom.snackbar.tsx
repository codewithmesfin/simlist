import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from ".";
import { color } from "../utils";

interface PROPS {
  title?: string;
  subtitle?: string;
  btnText?: string;
  onBtnClick: () => void;
  open: boolean;
  children?: any;
  type?: string
  permanent?: boolean
}
export default function BottomSnackbar({
  title,
  subtitle,
  onBtnClick,
  open,
  type,
  permanent
}: PROPS) {


  useEffect(() => {
    if (!permanent) {
      const timer = setTimeout(() => {
        onBtnClick()
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [])


  return open && (
    <View style={{
      position: "absolute",
      bottom: 0,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
      padding: 20,
      backgroundColor: type === "error" ? 'red'
        : type === "success" ? 'green'
          : type === "info" ? color.primary
            : type === "danger" ? 'orange'
              : 'white',
      left: 1, right: 1,
      borderRadius: 2, borderTopEndRadius: 30

    }}>
      <View>
        <View >
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between",paddingBottom:15 }}>
              {title && (
                <Text style={{
                  fontSize: 20, color:
                    type && type !== "" ? 'white' : "#666666", fontWeight: "700"
                }}>
                  {title}
                </Text>
              )}
              <TouchableOpacity onPress={() =>
                onBtnClick()
              }>
                <Icon name="close" size={25} color={type && type !== "" ? 'white' : color.primary} />
              </TouchableOpacity>
            </View>
            {subtitle && (
              <Text style={{ fontSize: 16, color: type && type !== "" ? 'white' : "#666666", paddingTop: 7 }}>
                {subtitle}
              </Text>
            )}
          </View>

        </View>
      </View>
    </View>
  );
}
