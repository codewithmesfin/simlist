import React, { useRef, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { color, constants, jwt, validator } from "../../utils";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { Card, ImagePicker, Input, Loading, MiniNavbar, Modal } from "../../components";
import SelectDialog from "../../components/select.dialog";
import Tips from "../items/newItem/Tips";
import { useSnackbar } from "../../context/snackbar.context";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';
import { usePopup } from "../../context/popup.context";
import { useAuth } from "../../context/auth.context";
import locations from "../../data/locations";
import PhoneInput from "react-native-phone-number-input";

const width = Dimensions.get("window").width;



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

const MARKETPLACE_MUTATION = gql`
  mutation CreateMarketplace($input:MarketplaceInput!) {
      createMarketplace(data: $input) {
       data{
        id
        attributes{
          name
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
  const phoneInput = useRef(null);

  const { token } = useAuth();
  const decodedAccessToken: any = jwt.decode(token)

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
  const [CreateMarketplace] = useMutation(MARKETPLACE_MUTATION, {
    onCompleted: (data) => {
      setSaving(false)
      showPopup(
        "Success",
        `Your Marketplace has been submitted to Simlist. Your Marketplace will be visible public in short time after Simlist team reviews it and fits our terms, policies and conditions.`,
        "success"
      )
    },
    onError: (err) => {
      setSaving(false)
      // console.log("Errow: ", err)
      showSnackbar(
        "System Problem",
        'Dear customer, we are unable to submit your marketplace information right now. Try again later. thank you for using Simlist.',
        "error"
      )
    }
  });



  const [pictures, setPictures] = useState([]);
  const [openTip, setTipOpen] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const removePicture = (pic: any) => {
    const pics = pictures.filter((f) => f !== pic);
    setPictures(pics);
  };

  const [isValid, setIsValid] = useState({
    pictures: true,
    name: true,
    type: true,
    phone: true,
    email: true,
    description: true,
    address: true,
    location: true,
    website: true
  });
  const [item, setItem] = useState({
    name: "",
    description: "",
    type: "",
    phone: "",
    email: "",
    address: "",
    location: locations[0],
    pictures: pictures,
    website: ""
  });

  const validateAllFields = () => {
    const validFields = {
      name: item.name !== "" && isValid.name,
      type: item.type !== "" && isValid.type,
      phone: item.phone !== "" && isValid.phone,
      email: item.email !== "" && isValid.email,
      description: item.description !== "" && isValid.description,
      address: item.address !== "" && isValid.address,
      location: item.location !== "" && isValid.location,
      pictures: item.pictures.length > 0
    };
    setIsValid({
      ...isValid,
      ...validFields,
    });

    return (
      validFields.name &&
      validFields.type &&
      validFields.phone &&
      validFields.email &&
      validFields.description &&
      validFields.address &&
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
      setSaving(true)
      await CreateMarketplace({
        variables: {
          "input": { ...item, owner: decodedAccessToken.id }
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
                <View>
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
                  <View style={{ paddingTop: 20 }}>

                    <View style={{ paddingBottom: 30 }}>
                      <Input
                        label="Name"
                        large
                        error={!isValid.name}
                        onchange={(e: string) => {
                          setIsValid({ ...isValid, name: e.length > 0 })
                          setItem({ ...item, name: e })
                        }}
                      />
                    </View>
                    <View style={{ paddingBottom: 30 }}>
                      <SelectDialog
                        title={
                          item?.type === ""
                            ? "marketplace type"
                            : "marketplace type" + ": " + item?.type
                        }
                        items={[
                          { title: "Food and Drinks" },
                          { title: "Trade" },
                          { title: "Profession" },
                          { title: "Other" },
                        ]}
                        height={360}
                        borderColor={isValid.type ? "grey" : "red"}
                        onselect={(e: any) => {
                          setIsValid({ ...isValid, type: e.title.length > 0 })
                          setItem({ ...item, type: e.title })
                        }}
                      />
                    </View>

                    <View style={{ paddingBottom: 30 }}>
                      <Input
                        label="Company Email"
                        large
                        error={!isValid.email}
                        onchange={(e: string) => {
                          setIsValid({ ...isValid, email: validator.validateEmail(e) })
                          setItem({ ...item, email: e })
                        }}
                      />
                    </View>

                    <View style={{ paddingBottom: 30 }}>

                      <PhoneInput
                        ref={phoneInput}
                        defaultValue={item.phone}
                        defaultCode="ET"
                        layout="first"
                        // withShadow
                        // autoFocus
                        containerStyle={{
                          width: "100%",
                          borderWidth: 1,
                          borderColor: "grey",
                          borderRadius: 5,
                          elevation: 0,
                          backgroundColor: "white",
                        }}
                        textContainerStyle={{
                          width: "100%",
                          elevation: 0,
                          backgroundColor: "white",
                          borderRadius: 5,
                          paddingVertical: 17,
                          paddingBottom: 10,
                        }}
                        onChangeFormattedText={(text) => {
                          setIsValid({ ...isValid, phone: validator.validatePhoneNumber(text) })
                          setItem({ ...item, phone: text })
                        }}
                      />
                    </View>


                    <View style={{ paddingBottom: 30 }}>
                      <Input
                        label="Website (optional)"
                        large
                        onchange={(e: string) => setItem({ ...item, website: e })}
                      />
                    </View>



                    <View style={{ paddingBottom: 30 }}>
                      <Input
                        label="Address"
                        placeholder="E.g. Merkato, Addis Ababa"
                        large
                        error={!isValid.address}
                        onchange={(e: string) => {
                          setIsValid({ ...isValid, address: e.length > 0 })
                          setItem({ ...item, address: e })
                        }}
                      />
                    </View>
                    <View style={{ paddingBottom: 30 }}>
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
                </View>
              </View>

              <View style={{ padding: 15, paddingTop: 0 }}>
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
