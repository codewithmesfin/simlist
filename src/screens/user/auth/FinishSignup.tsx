import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Button, Loading, MiniNavbar } from "../../../components";
import { useAuth } from "../../../context/auth.context";
import { useSnackbar } from "../../../context/snackbar.context";



const { height } = Dimensions.get("window");


const COMPLETE_PROFILE_MUTATION = gql`
   mutation CompleteProfile($id:ID!, $input:UsersPermissionsUserInput!){
 updateUsersPermissionsUser( id:$id,data:$input){
   data{
    id
  }
  }
}
`


export default function FinishSignup(props: any) {
    const { checkUserAuthentication, } = useAuth();
    const payload = props.route.params.payload ? props.route.params.payload : null
    const [signingup, setSigninup] = useState(false)


    const [FinishRegistration] = useMutation(COMPLETE_PROFILE_MUTATION, {
        onCompleted: (data) => {
            checkUserAuthentication()
            setSigninup(false)
        },
        onError: (err) => {
            console.log("Profile error: ", err)
            showSnackbar(
                "Registration Error",
                `Dear ${payload.firstName} we are unable to finish registration. Try again. Make sure your you don't have simlist account with this email and phone number`, "error",
                "Try again",
            )
            setSigninup(false)
        }
    });



    const signup = () => {
        setSigninup(true)
    
        FinishRegistration({
            variables: {
                id:payload.id,
                "input": {
                    "firstName": payload.firstName,
                    "lastName": payload.lastName,
                    "gender": payload.gender,
                    "phone": payload.phone
                }
            }
        });
    }

    const { openSnackbar } = useSnackbar();

    const showSnackbar = (title, subtitle, type, btnText) => {
        openSnackbar({
            title: title,
            subtitle: subtitle,
            btnText: btnText,
            type: type,
        });
    }

    return <View style={{ flex: 1, backgroundColor: "white", }}>
        <MiniNavbar title={"Finish creating simlist account"} />
        <View>
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
                <Text style={{
                    fontSize: 20, fontWeight: "700", textAlign: "center"
                }}>Finish Signinig up</Text>
                <View style={{ padding: 15, paddingTop: 30 }}>
                    <Text style={{ textAlign: "center", lineHeight: 22 }}>
                        By tapping Sign up, you agree to our
                        <Text style={{ color: "#2196f3" }} onPress={() => props.navigation.navigate("PrivacyPolicy")}> Terms, </Text>
                        <Text style={{ color: "#2196f3" }} onPress={() => props.navigation.navigate("PrivacyPolicy")}>Data Policy </Text> and
                        <Text style={{ color: "#2196f3" }} onPress={() => props.navigation.navigate("PrivacyPolicy")}> Cookie Policy.  </Text>
                        You may recieve SMS or Email notification from us and can
                        opt out any time. Information from your address book will
                        be continously uploaded to Simlist so that we can suggest
                        your friends if they are looking a new job and offer a
                        better service.
                    </Text>
                    <View style={{ paddingTop: 30 }}>
                     {signingup?
                     <Loading/>
                     :<Button title="Sign up" onclick={signup} />}
                    </View>
                </View>
            </View>
            <View style={{
                padding: 15,
            }}>
                <Text style={{ textAlign: "center", lineHeight: 22 }}>
                    Information about contacts in your address book, including
                    names, phone numbers and email will be sent to Simlist so we can suggest
                    jobs for your friends. You can turn this off in settings and manage or
                    delete contact you share with Simlist.
                    <Text style={{ color: "#2196f3" }} onPress={() => props.navigation.navigate("PrivacyPolicy")}> Learn More</Text>
                </Text>
            </View>
        </View>
    </View>
}