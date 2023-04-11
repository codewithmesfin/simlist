import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { color, constants, jwt } from "../../../utils";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { Card, Checkbox, ImagePicker, Input, Loading, Modal } from "../../../components";
import SelectDialog from "../../../components/select.dialog";
import Tips from "./Tips";
import { useSnackbar } from "../../../context/snackbar.context";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';
import { usePopup } from "../../../context/popup.context";
import { useAuth } from "../../../context/auth.context";
import locations from "../../../data/locations";


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

const MARKETPLACE_QUERY = gql`
    query MyMarketplace($id:ID!) {
      usersPermissionsUser(id: $id) {
      data{
        id
        attributes{
        marketplaces{
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



export default function AddItem(props: any) {
  const storeLocation = props.route.params?.location ? props.route.params?.location : locations[0]
  const [uploading, setUploading] = useState(false)
  const { token } = useAuth();


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

  const decodedAccessToken: any = jwt.decode(token)

  const { data: myMarketplaces, loading: marketplaceloading, error: marketplaceError } = useQuery<any>(
    MARKETPLACE_QUERY,
    { variables: { id: decodedAccessToken.id }, }
  );

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


  const userMarketplaces = myMarketplaces?.usersPermissionsUser?.data?.attributes?.marketplaces?.data ?
    myMarketplaces?.usersPermissionsUser?.data?.attributes?.marketplaces?.data : []



  const getMarketplaces = () => {
    const filteredMarketplaces = userMarketplaces.map((x: any) => {
      return {
        id: x.id,
        title: x.attributes.name
      }
    })
    // console.log("mk:", userMarketplaces)
    return filteredMarketplaces
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
    location: storeLocation,
    marketplace: "",
    marketplaceId: "",
    pictures: pictures,
    quantity: 1,
    delivery: true
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
      const decodedToken: any = jwt.decode(token)

      const itemData = {
        "category": item.categoryId,
        "subcategory": item.subcategoryId,
        "title": item.title,
        "description": item.description,
        "condition": item.condition,
        "price": parseFloat(`${item.price}`),
        "currency": item.currency,
        "pictures": item.pictures,
        "owner": decodedToken.id,
        "delivery": item.delivery,
        "quantity": parseInt(`${item.quantity}`),
        "marketplace": item.marketplaceId
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
          {saving ?
            <View>
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
            </TouchableOpacity>}
        </View>
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
                  <Input
                    label="Quantity"
                    keyboard="numeric"
                    large
                    value={`${item.quantity}`}
                    onchange={(e: any) => {
                      setItem({ ...item, quantity: e });
                    }}
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

                    items={getMarketplaces()}
                    height={450}
                    borderColor={isValid.marketplace ? "grey" : "red"}
                    onselect={(e: any) => {
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

                <View style={{ marginTop: 20 }}>
                  <Checkbox title="Offer item Delivery" selected={item.delivery} oncheck={() => setItem({ ...item, delivery: !item.delivery })} />
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
                    <Text>{item.location} </Text>
                  </View>

                  <SelectDialog
                    title={
                      item.location === ""
                        ? "location"
                        : "location" + ": " + item.location
                    }

                    items={locations.map(x => { return { title: x } })}
                    height={500}
                    onselect={(e: any) => {
                      setItem({ ...item, location: e.title });
                    }}
                    simpleBtn
                  />
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
