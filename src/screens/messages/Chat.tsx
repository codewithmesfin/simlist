import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { color as constants } from "../../utils";
import { ImagePicker, Modal, Toolbar } from "../../components";
import { Avatar } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function Chat(props: any) {
  const [input, setInput] = useState("");
  const [openImagePicker, setImagePickerOpen] = useState(false);
  const [message, setMessage] = useState({ text: "", picture: "" });

  const payload = props.route.params.payload;
  console.log(payload);
  return (
    <View style={{ flex: 1 }}>
      <Toolbar back />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View>
          <ScrollView>
            <View>
              <View
                style={{
                  paddingBottom: 100,
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "flex-end",
                  width: width - 50,
                }}
              >
                <TouchableOpacity>
                  <Avatar.Image
                    source={{
                      uri: payload.avatar,
                    }}
                    size={30}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: constants.light,
                    flex: 1,
                    borderTopLeftRadius: 100,
                    alignItems: "flex-end",
                    marginLeft: 5,
                    borderBottomRightRadius: 20,
                    borderRadius: 5,
                  }}
                >
                  {payload.picture && (
                    <Image
                      source={{ uri: message.picture }}
                      style={{
                        height: 100,
                        width: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  )}
                  <View style={{ padding: 20 }}>
                    <Text>{payload.subtitle}</Text>
                    <Text style={{ fontSize: 12, color: "grey" }}>
                      {payload.time}
                    </Text>
                  </View>
                </View>
              </View>

              {(message.picture !== "" || message.text !== "") && (
                <View
                  style={{
                    paddingBottom: 100,
                    padding: 20,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    width:width-50,
                    justifyContent:"flex-end",flex:1
                  }}
                >
                  <View
                    style={{
                      backgroundColor: constants.light,
                      borderTopRightRadius: 100,
                      alignItems: "flex-end",
                      marginLeft: 5,
                      borderBottomLeftRadius: 20,
                      borderRadius: 5,
                      flex:1
                    }}
                  >
                    {message.picture !== "" && (
                      <Image
                        source={{ uri: message.picture }}
                        style={{
                          height: width / 2,
                          width: width / 2,
                          resizeMode: "contain",
                        }}
                      />
                    )}
                    <View style={{ padding: 20 }}>
                      <Text>{message.text}</Text>
                    </View>
                  </View>

                  <TouchableOpacity>
                    <Avatar.Image
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU",
                      }}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>

        {openImagePicker && (
          <Modal
            bottom
            toggle={openImagePicker}
            close={() => setImagePickerOpen(false)}
            children={
              <View>
                <ImagePicker
                  onSelectOrTake={(src: string): any => {
                    setMessage({ ...message, picture: src });
                    setImagePickerOpen(false);
                  }}
                  canceled={() => setImagePickerOpen(false)}
                />
              </View>
            }
            title={"Upload picture"}
            height={220}
          />
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: 40 }}
            onPress={() => setImagePickerOpen(true)}
          >
            <MaterialIcons
              name="add-to-photos"
              size={30}
              color={constants.primary}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#DDDDDD",
              // backgroundColor: constants.light,
              borderRadius: 20,
              paddingLeft: 15,
              paddingRight: 15,
              padding: 10,
              flex: 1,
            }}
          >
            <TextInput
              style={{ flex: 1 }}
              placeholder="Write your message here ..."
              onChangeText={(e) => setInput(e)}
              value={input}
            />
            <TouchableOpacity
              onPress={() => {
                setMessage({ ...message, text: input });
                setInput("");
              }}
            >
              <Ionicons name="ios-send" size={18} color={constants.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
