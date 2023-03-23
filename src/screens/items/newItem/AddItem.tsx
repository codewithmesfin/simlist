import React, { useEffect, useState } from "react";
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

import Tips from "./Tips";
import stocks from "../../../data/stocks";
import { useSnackbar } from "../../../context/snackbar.context";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';


const width = Dimensions.get("window").width;


const CATEGORY_QUERY = gql`
    query GetAllCategories {
      getAllCategories {
        id
        name
        subcategories {
          name
          id
        }
     } 
  }
`

const USER_QUERY = gql`
    mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    path
  }
}
`

interface CATEGORY_PROPS {
  __typename?: string
  id: string
  name: string
  subcategories: CATEGORY_PROPS[]
}



export default function AddItem(props: any) {
  const [uploadFile] = useMutation(USER_QUERY, {
    onCompleted: (data) => {
      const pics: any = pictures.length > 0 ? [...pictures, ...[data.uploadFile.path]] : [data.uploadFile.path];
      setPictures(pics);
      setItem({ ...item, pictures: pics })
    },
    onError: (err) => {
      console.log("Error:", err)
    }
  });


  const { data, loading, error } = useQuery<any>(CATEGORY_QUERY);

  const categories: CATEGORY_PROPS[] = data?.getAllCategories

  const getCategory = () => {
    return categories?.map((x: CATEGORY_PROPS) => {
      return { id: x.id, title: x.name }
    })
  }

  const getSubcategory = (categoryId: string) => {
    const targetCategory = categories?.filter(f => f.id === categoryId)[0]
    return targetCategory?.subcategories.map((x: CATEGORY_PROPS) => {
      return { id: x.id, title: x.name }
    })
  }

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
    currency: true,
    condition: true,
    description: true,
    pictures: true,
    location: true,
    marketplace: true,
  });
  const [item, setItem] = useState({
    title: "",
    price: 0,
    currency: "",
    category: "",
    categoryId: "",
    subcategory: "",
    subcategoryId: "",
    condition: "",
    subcondition: "",
    description: "",
    location: "",
    marketplace: "",
    marketplaceId: "",
    pictures: pictures
  });



  const validateAllFields = () => {
    const validFields = {
      title: item.title !== "" && isValid.title,
      price: item.price > 0 && isValid.price,
      currency: item.currency !== "" && isValid.currency,
      category: item.category !== "" && isValid.category,
      subcategory: item.subcategory !== "" && isValid.subcategory,
      condition: item.condition !== "" && isValid.condition,
      marketplace: item.marketplace !== "" && isValid.marketplace,
      location: item.location !== "" && isValid.location,
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

  //Generate RN Filename
  function generateRNFile(uri, name) {
    return uri ? new ReactNativeFile({
      uri,
      type: mime.lookup(uri) || 'image',
      name,
    }) : null;
  }

  //Upload Pictures
  const uploadPicture = async (src) => {
    const extension = src.split(".").pop();
    const file = generateRNFile(src, `file-${Date.now()}.${extension}`);

    try {
      await uploadFile({
        variables: { file },
      });
      setShowImagePicker(false);
      console.log('Uploaded', item)
    } catch (e) {
      console.log('Error')
    }

  }

  const submit = () => {
    if (validateAllFields()) console.log(true);
    else {
      showSnackbar(
        "Form Validation Error",
        'Dear customer, please all the required fields and try again.',
        "error"
      )
    }
  };


  const { openSnackbar } = useSnackbar();

  const showSnackbar = (title, subtitle, type) => {
    openSnackbar({
      title: title,
      subtitle: subtitle,
      btnText: "OK",
      type: type,
    });
  }

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
                    onchange={(e: string) => {
                      setIsValid({ ...isValid, title: e.length > 10 });
                      setItem({ ...item, title: e });
                    }}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Input
                    label="Unit Price"
                    keyboard="numeric"
                    large
                    error={!isValid.price}
                    onchange={(e: any) => {
                      setIsValid({ ...isValid, price: e > 0 });
                      setItem({ ...item, price: e });
                    }}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <SelectDialog
                    noCapitalization
                    title={
                      item.currency === ""
                        ? "Currency"
                        : "Currency" + ": " + item.currency
                    }
                    items={[
                      { title: "ETB" },
                      { title: "USD" },
                      { title: "EURO" },
                      { title: "POUND" }
                    ]}
                    height={360}
                    borderColor={isValid.currency ? "grey" : "red"}
                    onselect={(e: any) => {
                      setIsValid({ ...isValid, currency: e.title.length > 0 });
                      setItem({ ...item, currency: e.title });
                    }}
                    titleColor={isValid.currency ? "grey" : "red"}
                  />
                </View>

                <View style={{ marginTop: 20 }}>
                  <SelectDialog
                    title={
                      item.category === ""
                        ? "category"
                        : "category" + ": " + item.category
                    }
                    items={getCategory()}
                    height={450}
                    borderColor={isValid.category ? "grey" : "red"}
                    onselect={(e: any) => {
                      setIsValid({ ...isValid, category: e.title !== "" && e.title.length > 0 });
                      setItem({ ...item, category: e.title, categoryId: e.id });

                    }}
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
                    items={getSubcategory(item.categoryId)}
                    height={450}
                    borderColor={isValid.subcategory ? "grey" : "red"}
                    onselect={(e: any) => {
                      setIsValid({ ...isValid, subcategory: e.title !== "" && e.title.length > 0 });
                      setItem({ ...item, subcategory: e.title, subcategoryId: e.id });
                    }}
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
                    onselect={(e: any) => {
                      setIsValid({ ...isValid, condition: e.title !== "" && e.title.length > 0 });
                      setItem({ ...item, condition: e.title });
                    }}
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
                    onselect={(e: any) => {
                      //  onMarketplaceChange(e.title)
                      setIsValid({ ...isValid, marketplace: e.title !== "" && e.title.length > 0 });
                      setItem({ ...item, marketplace: e.title, marketplaceId: e.id });
                    }}
                    titleColor={isValid.marketplace ? "grey" : "red"}
                  />
                </View>

                <View style={{ marginTop: 20 }}>
                  <Input
                    label="Description"
                    multiline
                    large
                    error={!isValid.description}
                    onchange={(e: string) => {
                      setIsValid({ ...isValid, description: e.length > 20 });
                      setItem({ ...item, description: e });
                    }}
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
                  Simlist items are public and can be seen by any one using the
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
                  to make sure they follow our {""}
                  <Text style={{ color: color.primary, }}>
                    commercial policies and regulation {""}
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
                  uploadPicture(src)
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
