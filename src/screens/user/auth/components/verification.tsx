import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Input, Loading } from "../../../../components";

export default function Verification(props: any) {
  const [code, setCode] = useState("");
  return (
    <View>
      <View style={{ padding: 15,paddingTop:5 }}>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}>
          Dear customer!
        </Text>
        <Text style={{ textAlign: "center",fontWeight:"400",lineHeight:23,fontSize:16,paddingTop:10 }}>
          We have sent you a verification code. Check your SMS and enter the
          code on the field below.
        </Text>
      </View>
      <View style={{ padding: 15 }}>
        <Input
          mode
          label="Verification Code"
          onchange={(e: string) => setCode(e)}
          keyboard="numeric"
        />
      </View>
      <View style={{ padding: 15 }}>
        {props.loading ? (
          <Loading />
        ) : (
          <Button
            disabled={code === "" ? true : false}
            title="Confirm"
            onclick={() => props.onsubmit(code)}
          />
        )}
      </View>
    </View>
  );
}
