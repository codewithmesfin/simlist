import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";
import { Feather } from "@expo/vector-icons";

const Bottomsheet = (props: any) => {
  const [visible, setVisible] = useState(props.open);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  return (
    <View>
      {props.btn ? (
        props.btn
      ) : (
        <TouchableOpacity onPress={toggleBottomNavigationView}>
          {props.isVertical ? (
            <Feather name="more-vertical" size={24} color="black" />
          ) : (
            <Feather name="more-horizontal" size={30} color="black" />
          )}
        </TouchableOpacity>
      )}
      <View>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View
            style={[
              styles.bottomNavigationView,
              { height: props.height ? props.height : null },
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    height: 5,
                    backgroundColor: "grey",
                    borderRadius: 30,
                    width: 50,
                    marginBottom: 10,
                  }}
                  onPress={toggleBottomNavigationView}
                ></TouchableOpacity>
              </View>
              <View style={{ alignItems: "flex-start" }}>
                {props.items.map((x: any, i: number) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderBottomWidth: props.items.length - 1 > i ? 1 : 0,
                      borderBottomColor: "#DDDDDD",
                      width: "100%",
                    }}
                  >
                    {x.icon ? x.icon : null}
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        paddingLeft: 15,
                      }}
                    >
                      {x.title}{" "}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

export default Bottomsheet;

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    minHeight: 250,
    justifyContent: "center",
    padding: 15,
  },
});
