import { gql, useMutation, } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import PhoneInput from "react-native-phone-number-input";


import { Button, Input, Loading, SelectDialog } from "../../../../components";
import { validator } from "../../../../utils";
import auth from "../../../../service/auth.services";
import { usePopup } from "../../../../context/popup.context";
import { useAuth } from "../../../../context/auth.context";


const REGISTER_MUTATION = gql`
   mutation Signup($input:UsersPermissionsRegisterInput!) {
      register(input: $input) {
      jwt
        user{
            id
            username
            email
        }
      }
    }
`

export default function SignupForm(props: any) {
    const navigation: any = useNavigation()
    const phoneInput = useRef(null);
    const [signingup, setSigninigup] = useState(false)
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        avatar: "",
        birthdate: "",
        status: "pending",
    });

    const [isValid, setIsValid] = useState({
        firstName: true, lastName: true, email: true, phone: true,
        gender: true, password: true
    })

    const [Register] = useMutation(REGISTER_MUTATION, {
        onCompleted: (data) => {
            const response = {
                id: data.register.user.id,
                token: data.register.jwt
            }
            auth.setUser(response)
            setSigninigup(false)
            navigation.navigate("FinishSignup", { payload: {...user,id:response.id} })
        },
        onError: (err) => {
            console.log("Reg error: ", err)
            showPopup(
                "Registration Error",
                `Dear ${user.firstName} we are unable to finish registration. Try again. Make sure your you don't have an account with this email and phone number`, "error",

            )
            setSigninigup(false)
        }
    });
    const signup = () => {
        setSigninigup(true)
        Register({
            variables: {
                "input": { username: user.email, email: user.email, password: user.password }
            }
        });
    }

    const { openPopup } = usePopup();
    const showPopup = (title, subtitle, type) => {
        openPopup({
            title: title,
            subtitle: subtitle,
            btnText: "Continue",
            type: type,
        });
    }

    return (
        <View style={{ width: "100%" }}>

            <View style={{ padding: 10, width: "100%", }}>
                <Input mode label="First Name"
                    error={!validator.validateName(user.firstName) && user.firstName !== ""}
                    onchange={(e: string) => {
                        setIsValid({ ...isValid, firstName: validator.validateName(e) })
                        setUser({ ...user, firstName: e })
                    }}
                />
            </View>

            <View style={{ padding: 10, width: "100%", }}>
                <Input mode label="Last Name"
                    error={!validator.validateName(user.lastName) && user.lastName !== ""}
                    onchange={(e: string) => {
                        setIsValid({ ...isValid, lastName: validator.validateName(e) })
                        setUser({ ...user, lastName: e })
                    }}
                />
            </View>

            <View style={{ padding: 10, width: "100%", paddingTop: 15 }}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={user.phone}
                    defaultCode="ET"
                    layout="first"
                    // withShadow
                    // autoFocus
                    containerStyle={{
                        width: "100%",
                        borderBottomWidth: 1,
                        borderBottomColor: "grey",
                        borderRadius: 5,
                        elevation: 0,
                        backgroundColor: "white",
                        padding: 4
                    }}
                    textContainerStyle={{
                        width: "100%",
                        elevation: 0,
                        backgroundColor: "white",
                        borderRadius: 5,
                        paddingVertical: 10,
                        paddingBottom: 10,
                    }}
                    onChangeFormattedText={(text) => {
                        setIsValid({ ...isValid, phone: validator.validatePhoneNumber(text) })
                        setUser({ ...user, phone: text })
                    }}
                />
            </View>

            <View style={{ padding: 10, width: "100%", }}>
                <SelectDialog
                    flat
                    title={
                        user.gender === ""
                            ? "gender"
                            : "gender" + ": " + user.gender
                    }
                    items={[
                        { title: "Male" },
                        { title: "Female" },
                        { title: "Other" },
                    ]}
                    height={280}
                    borderColor={isValid.gender ? "grey" : "red"}
                    onselect={(e: any) => {
                        setIsValid({ ...isValid, gender: e !== "" })
                        setUser({ ...user, gender: e.title })
                    }}
                    titleColor={isValid.gender ? "grey" : "red"}
                />
            </View>


            <View style={{ padding: 10, width: "100%", }}>
                <Input mode label="Email"
                    error={!validator.validateEmail(user.email) && user.email !== ""}
                    onchange={(e: string) => {
                        setIsValid({ ...isValid, email: validator.validateEmail(e) })
                        setUser({ ...user, email: e })
                    }}
                    keyboard="email-address"
                    placeholder="e.g. example@example.com"
                />
            </View>

            <View style={{ padding: 10, width: "100%", paddingBottom: 30 }}>
                <Input mode
                    label="Password"
                    onchange={(e: string) => {
                        setIsValid({ ...isValid, password: validator.validatePassword(e) })
                        setUser({ ...user, password: e })
                    }}
                    password
                    error={!validator.validatePassword(user.password) && user.password !== ""}
                />
            </View>

            <View style={{ padding: 10, paddingTop: 30 }}>
                {signingup ? (
                    <Loading />
                ) : (
                    <Button
                        disabled={user.email === "" || !validator.validateEmail(user.email) || user.password === "" ? true : false}
                        title="Continue"
                        onclick={signup}
                    />
                )}
            </View>
        </View>
    );
}
