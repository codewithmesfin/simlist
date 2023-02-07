import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "../utils";
import Input from "./input";
import category from "../data/category";
import Button from "./button";



interface FILTER {
  sortBy?: string;
  condition?: string;
  dateListed?: string;
  availability?: string;
  minimumPrice?: number;
  maximumPrice?: number;
}

const Filtersheet = (props: any) => {
  const [visible, setVisible] = useState(props.open);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  // console.log(props.items)
  const [selctedFilters, setFilters] = useState<FILTER>({
    sortBy: "",
    condition: "",
    dateListed: "",
    availability: "",
    minimumPrice: 0,
    maximumPrice: 0,
  });
  const sortByItems = [
    "Recommended",
    "Distance: Nearest first",
    "Date listed: Newest first",
    "Price: Lowest First",
    "Price: Highest First",
  ];
  const conditions = ["Any", "New", "Used", "Slightly Used"];
  const dateListed = ["Any", "Last 24 hours", "Last 7 days", "Last 30 days"];
  const availability = ["Available", "Sold", "Out of Stock"];
  return (
    <View>
      {props.btn ? (
        props.btn
      ) : (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={toggleBottomNavigationView}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: color.primary,
              paddingRight: 5,
            }}
          >
            Filters
          </Text>
          <MaterialCommunityIcons
            name="sort"
            size={24}
            color={color.primary}
          />
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 20,
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity onPress={toggleBottomNavigationView}>
                    <Entypo name="chevron-left" size={30} color="black" />
                  </TouchableOpacity>

                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Filters
                  </Text>

                  <TouchableOpacity>
                    <Text
                      style={{
                        color: color.primary,
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View>
                    <Text style={{ fontWeight: "800", fontSize: 20 }}>
                      Sort by
                    </Text>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                    >
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        {sortByItems.map((x: any, i: number) => (
                          <View key={i}>
                            <TouchableOpacity
                              style={{
                                backgroundColor:
                                  selctedFilters.sortBy == x
                                    ? color.primary
                                    : color.light,
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 30,
                                paddingLeft: 20,
                                paddingRight: 20,
                              }}
                              onPress={() =>
                                setFilters({ ...selctedFilters, sortBy: x })
                              }
                            >
                              <Text
                                style={{
                                  color:
                                    selctedFilters.sortBy == x
                                      ? "white"
                                      : "black",
                                  fontWeight: "800",
                                  fontSize: 16,
                                }}
                              >
                                {x}{" "}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </ScrollView>
                    <View style={{ marginTop: 15 }}>
                      <Text style={{ fontWeight: "800", fontSize: 20 }}>
                        Price
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ width: "48%" }}>
                          <Input
                            label="Minimum"
                            keyboard="numeric"
                            onchange={(e: any) =>
                              setFilters({ ...selctedFilters, minimumPrice: e })
                            }
                          />
                        </View>
                        <View style={{ width: "48%" }}>
                          <Input
                            label="Maximum"
                            onchange={(e: any) =>
                              setFilters({ ...selctedFilters, maximumPrice: e })
                            }
                          />
                        </View>
                      </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontWeight: "800", fontSize: 20 }}>
                        Condition
                      </Text>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                      >
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          {conditions.map((x: any, i: number) => (
                            <View key={i}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor:
                                    selctedFilters.sortBy == x
                                      ? color.primary
                                      : color.light,
                                  padding: 10,
                                  marginRight: 10,
                                  borderRadius: 30,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                }}
                                onPress={() =>
                                  setFilters({ ...selctedFilters, sortBy: x })
                                }
                              >
                                <Text
                                  style={{
                                    color:
                                      selctedFilters.sortBy == x
                                        ? "white"
                                        : "black",
                                    fontWeight: "800",
                                    fontSize: 16,
                                  }}
                                >
                                  {x}{" "}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontWeight: "800", fontSize: 20 }}>
                        Date Listed
                      </Text>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                      >
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          {dateListed.map((x: any, i: number) => (
                            <View key={i}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor:
                                    selctedFilters.sortBy == x
                                      ? color.primary
                                      : color.light,
                                  padding: 10,
                                  marginRight: 10,
                                  borderRadius: 30,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                }}
                                onPress={() =>
                                  setFilters({ ...selctedFilters, sortBy: x })
                                }
                              >
                                <Text
                                  style={{
                                    color:
                                      selctedFilters.sortBy == x
                                        ? "white"
                                        : "black",
                                    fontWeight: "800",
                                    fontSize: 16,
                                  }}
                                >
                                  {x}{" "}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>

                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontWeight: "800", fontSize: 20 }}>
                        Category
                      </Text>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                      >
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          {category.map((x: any, i) => (
                            <View key={i}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor:
                                    selctedFilters.sortBy == x
                                      ? color.primary
                                      : color.light,
                                  padding: 10,
                                  marginRight: 10,
                                  borderRadius: 30,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                }}
                                onPress={() =>
                                  setFilters({ ...selctedFilters, sortBy: x })
                                }
                              >
                                <Text
                                  style={{
                                    color:
                                      selctedFilters.sortBy == x
                                        ? "white"
                                        : "black",
                                    fontWeight: "800",
                                    fontSize: 16,
                                  }}
                                >
                                  {x.title}{" "}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>

                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontWeight: "800", fontSize: 20 }}>
                        Availability
                      </Text>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                      >
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          {availability.map((x: any, i: number) => (
                            <View key={i}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor:
                                    selctedFilters.sortBy == x
                                      ? color.primary
                                      : color.light,
                                  padding: 10,
                                  marginRight: 10,
                                  borderRadius: 30,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                }}
                                onPress={() =>
                                  setFilters({ ...selctedFilters, sortBy: x })
                                }
                              >
                                <Text
                                  style={{
                                    color:
                                      selctedFilters.sortBy == x
                                        ? "white"
                                        : "black",
                                    fontWeight: "800",
                                    fontSize: 16,
                                  }}
                                >
                                  {x}{" "}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={{ paddingTop: 25 }}>
                    <Button title="See Listing" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

export default Filtersheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    maxHeight: 750,
    justifyContent: "center",
    padding: 15,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
});
