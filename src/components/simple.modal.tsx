import React, { useState } from "react";
import { Text, View } from "react-native";
import { Modal, Button } from ".";

interface PROPS {
  title?: string;
  subtitle?: string;
  btnText?: string;
  onBtnClick: () => void;
  open: boolean;
  children?: any;
}
export default function SimpleModal({
  title,
  subtitle,
  onBtnClick,
  btnText,
  open,
  children
}: PROPS) {
  const [openErrorModal, setErrorModalOpen] = useState(open);
  return (
    <Modal
    style={{borderRadius:20}}
      toggle={openErrorModal}
      close={() => setErrorModalOpen(false)}
      title={
        title && (
          <Text
            style={{ fontSize: 24, fontWeight: "700", textAlign: "center",paddingTop:32 }}
          >
            {title}
          </Text>
        )
      }
      children={
        <View>
          {subtitle && (
            <Text style={{ textAlign: "center", fontSize: 16,color:"#666666",lineHeight:20 }}>
              {subtitle}
            </Text>
          )}
          {btnText && (
            <View style={{ padding: 15 ,paddingTop:54}}>
              <Button title={btnText} borderRadius={100} onclick={onBtnClick} />
            </View>
          )}
          {children &&children}
        </View>
      }
    />
  );
}
