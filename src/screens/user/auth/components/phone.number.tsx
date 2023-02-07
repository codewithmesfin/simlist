import React, { useRef, useState } from "react";
import { View, Text, Image, Alert, Dimensions, ScrollView } from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { Button, Loading } from "../../../../components";
import { validator } from "../../../../utils";

export default function Signin(props: any) {
  const phoneInput = useRef(null);
  const [user, setUser] = useState({ phone: "" });

  return (
    <View style={{ width: "100%" }}>
      <View style={{ padding: 20, width: "100%", paddingBottom: 30 }}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={user.phone}
          placeholder="Phone Number"
          defaultCode="ET"
          layout="first"
        //   withShadow
        //   autoFocus
          containerStyle={{
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor:
              validator.validatePhoneNumber(user.phone) || user.phone == ""
                ? "#DDDDDD"
                : "red",
            borderRadius: 5,
            backgroundColor: "white",
          }}
          textContainerStyle={{
            width: "100%",
            elevation: 0,
            backgroundColor: "white",
            borderRadius: 5,
            paddingVertical: 5,
            paddingBottom: 10,
          }}
          onChangeFormattedText={(text: string) =>
            setUser({ ...user, phone: text })
          }
        />
      </View>
      <View style={{ padding: 15 }}>
        {props.loading ? (
          <Loading />
        ) : (
          <Button
            disabled={user.phone === "" || !validator.validatePhoneNumber(user.phone) ? true : false}
            title="Continue"
            onclick={()=>props.onsubmit(user.phone)}
          />
        )}
      </View>
    </View>
  );
}
