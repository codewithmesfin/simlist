import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { color, constants } from "../../../utils";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { Card, ImagePicker, Input, Modal } from "../../../components";
import SelectDialog from "../../../components/select.dialog";
import category from "../../../data/category";
import Tips from "./Tips";
import stocks from "../../../data/stocks";


const width = Dimensions.get("window").width;
export default function AddItem(props: any) {
  const [pictures, setPictures] = useState([]);
  const [openTip, setTipOpen] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const removePicture = (pic: any) => {
    const pics = pictures.filter((f) => f !== pic);
    setPictures(pics);
  };

  const [isValid, setIsValid] = useState({
    title: true,
    price: true,
    category: true,
    subcategory: true,
    condition: true,
    description: true,
    pictures: true,
    location: true,
    marketplace: true,
  });
  const [item, setItem] = useState({
    title: "",
    price: 0,
    category: "",
    subcategory: "",
    condition: "",
    subcondition: "",
    description: "",
    location: "",
    marketplace: ""
  });

  const onTitleChange = (e: string) => {
    setIsValid({ ...isValid, title: e.length > 10 });
    setItem({ ...item, title: e });
  };

  const onPriceChange = (e: number) => {
    setIsValid({ ...isValid, price: e > 0 });
    setItem({ ...item, price: e });
  };

  const onCategoryChange = (e: string) => {
    setIsValid({ ...isValid, category: e !== "" && e.length > 0 });
    setItem({ ...item, category: e });
  };
  const onSubcategoryChange = (e: string) => {
    setIsValid({ ...isValid, subcategory: e !== "" && e.length > 0 });
    setItem({ ...item, subcategory: e });
  };

  const onConditionChange = (e: string) => {
    setIsValid({ ...isValid, condition: e !== "" && e.length > 0 });
    setItem({ ...item, condition: e });
  };

  const onDescriptionChange = (e: string) => {
    setIsValid({ ...isValid, description: e.length > 20 });
    setItem({ ...item, description: e });
  };

  const onLocationChange = (e: string) => {
    setIsValid({ ...isValid, location: e !== "" && e.length > 0 });
    setItem({ ...item, location: e });
  };

  const onMarketplaceChange = (e: string) => {
    setIsValid({ ...isValid, marketplace: e !== "" && e.length > 0 });
    setItem({ ...item, marketplace: e });
  };

  const validateAllFields = () => {
    const validFields = {
      title: item.title !== "" && isValid.title,
      price: item.price > 0 && isValid.price,
      category: item.category !== "" && isValid.category,
      subcategory: item.subcategory !== "" && isValid.subcategory,
      condition: item.condition !== "" && isValid.condition,
      marketplace: item.marketplace !== "" && isValid.marketplace,
      location: item.location!== "" && isValid.location,
      description: item.description !== "" && isValid.description,
      pictures: pictures.length > 0,
    };
    setIsValid({
      ...isValid,
      ...validFields,
    });
    return (
      validFields.title &&
      validFields.price &&
      validFields.category &&
      validFields.subcategory &&
      validFields.condition &&
      validFields.description &&
      validFields.marketplace &&
      validFields.location &&
      pictures.length > 0
    );
  };

  const submit = () => {
    if (validateAllFields()) console.log(true);
    else {
      // Alert.alert(
      //   "Form Validation Error",
      //   "Dear customer, please all the required fields and try again.",
      //   [{ text: "OK", onPress: () => {} }]
      // );
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Text
              style={{
                color: color.primary,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>New item</Text>
          <TouchableOpacity onPress={submit}>
            <Text
              style={{
                color: color.primary,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ paddingBottom: 100 }}>
              <View style={{ padding: 15 }}>
                {pictures.length < 1 ? (
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 150,
                        borderWidth: 1.2,
                        borderColor: isValid.pictures ? "#DDDDDD" : "red",
                        borderRadius: 8,
                      }}
                      onPress={() => setShowImagePicker(!showImagePicker)}
                    >
                      <MaterialIcons
                        name="add-to-photos"
                        size={30}
                        color="black"
                      />
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontSize: 18,
                          fontWeight: "500",
                        }}
                      >
                        Add Photos
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        height: 150,
                        borderWidth: 1.2,
                        borderColor: "#DDDDDD",
                        borderRadius: 8,
                        padding: 10,
                        minWidth: width - 30,
                      }}
                    >
                      {pictures.map((x: any, i: number) => (
                        <View key={i} style={{ marginRight: 10 }}>
                          <Card
                            style={{
                              height: 120,
                              width: "100%",
                              minWidth: 110,
                              borderRadius: 10,
                            }}
                            children={
                              <ImageBackground
                                source={{ uri: x }}
                                resizeMode="cover"
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: 10,
                                }}
                              >
                                <View
                                  style={{
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    padding: 5,
                                  }}
                                >
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: "white",
                                      justifyContent: "center",
                                      borderRadius: 100,
                                    }}
                                    onPress={() => removePicture(x)}
                                  >
                                    <AntDesign
                                      name="closecircle"
                                      size={24}
                                      color="black"
                                    />
                                  </TouchableOpacity>
                                </View>
                              </ImageBackground>
                            }
                          />
                        </View>
                      ))}
                      <TouchableOpacity
                        onPress={() => setShowImagePicker(!showImagePicker)}
                        style={{
                          height: 110,
                          width: 110,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons name="add-circle" size={40} color="black" />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                )}
                <View style={{ paddingTop: 10 }}>
                  <Text>
                    Photos: {pictures.length}/10. Choose your listing's main
                    photo first.
                  </Text>
                  <TouchableOpacity onPress={() => setTipOpen(!openTip)}>
                    <Text
                      style={{
                        color: color.primary,
                        paddingTop: 5,
                        fontWeight: "600",
                      }}
                    >
                      How to take a geat listing photo
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Input
                    label="Item Name"
                    large
                    error={!isValid.title}
                    onchange={onTitleChange}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Input
                    label="Unit Price"
                    keyboard="numeric"
                    large
                    error={!isValid.price}
                    onchange={onPriceChange}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <SelectDialog
                    title={
                      item.category === ""
                        ? "category"
                        : "category" + ": " + item.category
                    }
                    items={category}
                    height={450}
                    borderColor={isValid.category ? "grey" : "red"}
                    onselect={(e: any) => onCategoryChange(e.title)}
                    titleColor={isValid.category ? "grey" : "red"}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <SelectDialog
                    title={
                      item.category === ""
                        ? "subcategory"
                        : "subcategory" + ": " + item.subcategory
                    }
                    items={category}
                    height={450}
                    borderColor={isValid.subcategory ? "grey" : "red"}
                    onselect={(e: any) => onSubcategoryChange(e.title)}
                    titleColor={isValid.subcategory ? "grey" : "red"}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <SelectDialog
                    title={
                      item.condition === ""
                        ? "condition"
                        : "condition" + ": " + item.condition
                    }
                    items={[
                      { title: "New" },
                      { title: "Used- Like New" },
                      { title: "Used- Good Condition" },
                      { title: "Used- Fair" },
                      { title: "Refurbished" },
                    ]}
                    height={360}
                    borderColor={isValid.condition ? "grey" : "red"}
                    onselect={(e: any) => onConditionChange(e.title)}
                    titleColor={isValid.condition ? "grey" : "red"}
                  />
                </View>

                <View style={{ marginTop: 20 }}>
                  <SelectDialog
                    title={
                      item.marketplace === ""
                        ? "marketplace"
                        : "marketplace" + ": " + item.marketplace
                    }
                    items={stocks.map((x: any) => {
                      return {
                        title: x.title,
                        icon: (
                          <View
                            style={{
                              backgroundColor: "#edf2f7",
                              width: 35,
                              height: 35,
                              borderRadius: 40 / 2,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text style={{ fontSize: 15, fontWeight: "700" }}>
                              {`${x.title}`.charAt(0)}{" "}
                            </Text>
                          </View>
                        ),
                      };
                    })}
                    height={450}
                    borderColor={isValid.marketplace ? "grey" : "red"}
                    onselect={(e: any) => onMarketplaceChange(e.title)}
                    titleColor={isValid.marketplace ? "grey" : "red"}
                  />
                </View>

                <View style={{ marginTop: 20 }}>
                  <Input
                    label="Description"
                    multiline
                    large
                    error={!isValid.description}
                    onchange={onDescriptionChange}
                  />
                </View>

                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "800" }}>
                      Location
                    </Text>
                    <Text>Addis Ababa, Ethiopia</Text>
                  </View>
                  <TouchableOpacity style={{}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: color.primary,
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ padding: 15 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    lineHeight: 20,
                    color: "grey",
                  }}
                >
                  simlist items are public and can be seen by any one using the
                  app or Simlist website.
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    lineHeight: 20,
                    color: "grey",
                  }}
                >
                  All listings go through a quick standard review when published
                  to make sure they follow our
                  <Text style={{ color: color.primary }}>
                    Commercial policies and regulation
                  </Text>
                  before they are public to others. Items like animals, drugs,
                  weapons, counterfiets and more are not allowed.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {showImagePicker && (
        <Modal
          bottom
          toggle={showImagePicker}
          close={() => setShowImagePicker(false)}
          children={
            <View>
              <ImagePicker
                onSelectOrTake={(src: string): any => {
                  const pics: any =
                    pictures.length > 0 ? [...pictures, ...[src]] : [src];
                  setPictures(pics);
                  setShowImagePicker(false);
                }}
                canceled={() => setShowImagePicker(false)}
              />
            </View>
          }
          title={"Upload picture"}
          height={220}
        />
      )}
      {openTip && (
        <Modal
          bottom
          toggle={openTip}
          close={() => setTipOpen(false)}
          children={<Tips />}
          title={"Upload picture"}
          height={560}
          padding={1}
        />
      )}
    </View>
  );
}
