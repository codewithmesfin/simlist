import React, { useRef, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { Button, MiniNavbar } from "../../../components";

import { useDispatch } from "react-redux";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import PhoneNumber from "./components/phone.number";
import Verification from "./components/verification";
import { firebaseApp } from "../../../utils/firebase";
import {
  confirmCode,
  currentUser,
  sendVerification,
} from "../../../stores/services/user.services";
import auth from "../../../stores/services/auth.services";
import { showPopup } from "../../../stores/slices/simple.modal.slice";

const app = firebaseApp;

const { width, height } = Dimensions.get("window");

export default function Signin(props: any) {
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef(null);
  const firebaseConfig = app ? app.options : undefined;
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const attemptInvisibleVerification = false;

  const dispatch = useDispatch();

  const sendCode = async (phone: string) => {
    setLoading(true);
    dispatch(
      sendVerification({
        phone: phone,
        recaptchaVerifier: recaptchaVerifier.current,
      })
    )
      .unwrap()
      .then((res) => {
        setVerificationId(res);
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          showPopup({
            title: "Unable to send code",
            subtitle:
              'Dear customer, are not able to send a verification code to your phone. Try again after a few meoment.',
          })
        );
        setLoading(false);
      });
  };

  const verifyOtp = (code) => {
    
    setLoading(true);
    dispatch(
      confirmCode({
        verificationId: verificationId,
        verificationCode: code,
      })
    )
      .unwrap()
      .then(() => {
        signinUser();
      })
      .catch((err) => {
        dispatch(
          showPopup({
            title: "Verification error",
            subtitle:
              'Dear customer, are not able to confirm your verification code. Try again with a correct code.',
          })
        );
        setLoading(false);
      });
    
  };

  const signinUser = () => {
    dispatch(currentUser())
      .unwrap()
      .then((res) => {
        const user = {
          info: res.providerData[0],
          token: res?.stsTokenManager?.accessToken,
          uid: res?.uid,
        };
        auth.setUser(user);
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          showPopup({
            title: "Sign in error",
            subtitle:
              'Dear customer, we are not able to authenticate your credentials. Log out and sign in again.',
          })
        );
        setLoading(false);
      });
  };



  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <MiniNavbar title={"Signin to your account"} />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification
      />
      <View style={{}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: 20 }}>
            <View>
              <Image
                source={require("../../../../assets/images/i1.webp")}
                style={{
                  minWidth: 330,
                  maxWidth: 400,
                  width: "100%",
                  height: height / 3,
                  resizeMode: "stretch",
                }}
              />
            </View>
            <View>
              {verificationId ? (
                <Verification loading={loading} onsubmit={verifyOtp} />
              ) : (
                <PhoneNumber loading={loading} onsubmit={sendCode} />
              )}
            </View>
            <View style={{ padding: 20, paddingTop: 40 }}>
              <View
                style={{
                  paddingBottom: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 2,
                    width: "40%",
                    backgroundColor: "#DDDDDD",
                  }}
                />
                <Text style={{ textAlign: "center", fontWeight: "600" }}>
                  Or
                </Text>
                <View
                  style={{
                    height: 2,
                    width: "40%",
                    backgroundColor: "#DDDDDD",
                  }}
                />
              </View>
              <View
                style={{
                  paddingBottom: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  title="Create new simlist account"
                  onclick={() => props.navigation.navigate("Signup")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
