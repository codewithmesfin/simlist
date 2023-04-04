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
import { color, constants } from "../../utils";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { Card, ImagePicker, Input, Loading, MiniNavbar, Modal } from "../../components";
import SelectDialog from "../../components/select.dialog";

import Tips from "../items/newItem/Tips";
import stocks from "../../data/stocks";
import { useSnackbar } from "../../context/snackbar.context";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';
import { usePopup } from "../../context/popup.context";


const width = Dimensions.get("window").width;


const CATEGORY_QUERY = gql`
     query GetAllCategories {
      categories {
        data{
          id
        attributes{
          name
          subcategories{
            data{
              id
              attributes{
                name
              }
            }
          }
        }
        }
     } 
  }
`

const PICTURE_QUERY = gql`
   mutation($file: Upload!) {
    upload(file: $file) {
     data{
      id
      attributes{
        url
      }
    }
    }
  }
`

const ITEM_QUERY = gql`
  mutation CreateItem($input:ItemInput!) {
      createItem(data: $input) {
       data{
        id
        attributes{
          title
        }
      }
      }
    }
`

interface CATEGORY_PROPS {
  __typename?: string
  id: string
  name: string
  subcategories: CATEGORY_PROPS[]
}



export default function AddMarketplace(props: any) {
  const [uploading, setUploading] = useState(false)

  const [uploadFile] = useMutation(PICTURE_QUERY, {
    onCompleted: (data) => {
      const image = `${constants.API_ROOT}${data.upload.data.attributes.url}`
      const imageId = data.upload.data.id
      setUploading(false)
      const pics: any = pictures.length > 0 ? [...pictures, ...[image]] : [image];
      const picIds: any = item.pictures.length > 0 ? [...item.pictures, ...[imageId]] : [imageId];
      console.log(picIds)
      setPictures(pics);
      setItem({ ...item, pictures: picIds })
    },
    onError: (err) => {
      setUploading(false)
      console.log("Uploading Error:", err)
    }
  });

  const [saving, setSaving] = useState(false)
  const [CreateItem] = useMutation(ITEM_QUERY, {
    onCompleted: (data) => {
      setSaving(false)
      showPopup(
        "Success",
        `Your item has been posted on Simlist. Your post will be visible public in short time after Simlist team reviews it and fits our terms, policies and conditions.`,
        "success"
      )
    },
    onError: (err) => {
      setSaving(false)
      // console.log("Errow: ", err)
      showSnackbar(
        "System Problem",
        'Dear customer, we are unable to submit your item information right now. Try again later. thank you for using Simlist.',
        "error"
      )
    }
  });


  const { data, loading, error } = useQuery<any>(CATEGORY_QUERY);

  // console.log("data:",data,error)

  const rawData = data?.categories?.data ? data?.categories?.data : []
  const categories: CATEGORY_PROPS[] = rawData.map(x => {
    return {
      id: x.id,
      name: x.attributes.name,
      subcategories: x.attributes.subcategories.data.map(y => {
        return {
          id: y.id, name: y.attributes.name
        }
      })
    }
  })

  const getCategory = () => {
    return categories?.map((x: CATEGORY_PROPS) => {
      return {
        id: x.id, title: x.name
      }
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
    location: "Addis Ababa",
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
      pictures: item.pictures.length > 0,
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
    setUploading(true)
    setShowImagePicker(!showImagePicker)
    const extension = src.split(".").pop();
    const file = generateRNFile(src, `file-${Date.now()}.${extension}`);

    try {
      await uploadFile({
        variables: { file },
        // headers: {"Authorization":"Bearer sadfg"},
      });
      setShowImagePicker(false);
      // console.log('Uploaded', item)
    } catch (e) {
      console.log('Upload Error', e)
    }
  }


  const submit = async () => {
    // console.log(item)
    if (validateAllFields()) {
      const itemData = {
        "category": item.categoryId,
        "subcategory": item.subcategoryId,
        "title": item.title,
        "description": item.description,
        "condition": item.condition,
        "price": parseFloat(`${item.price}`),
        "pictures": item.pictures

      }
      setSaving(true)
      await CreateItem({
        variables: {
          "input": itemData
        },
      });
    }

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

  const { openPopup } = usePopup();
  const showPopup = (title, subtitle, type) => {
    openPopup({
      title: title,
      subtitle: subtitle,
      btnText: "Continue",
      type: type,
      navigate: "Home"
    });
  }

  const UploadIndicator = () => <View style={{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 50 / 2, padding: 2,
    backgroundColor: 'white', borderWidth: 2, borderColor: color.primary
  }}>
    <Loading size={16} />
  </View>



  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <MiniNavbar
          title="Register your marketplace"
          right={
            saving ? <View>
              <Loading />
            </View>
              : <TouchableOpacity onPress={submit}>
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
          }
        />
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ paddingBottom: 100 }}>
              <View style={{ padding: 15 }}>
                {
                  pictures.length < 1 ?

                    uploading ?
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 150,
                        borderWidth: 1.2,
                        borderColor: isValid.pictures ? "#DDDDDD" : "red",
                        borderRadius: 8,
                      }}>
                        <UploadIndicator />
                      </View>
                      : (
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
                          {uploading ?
                            <UploadIndicator />
                            : <TouchableOpacity
                              onPress={() => setShowImagePicker(!showImagePicker)}
                              style={{
                                height: 110,
                                width: 110,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Ionicons name="add-circle" size={40} color="black" />
                            </TouchableOpacity>}
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
