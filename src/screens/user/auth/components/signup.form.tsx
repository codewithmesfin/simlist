import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import PhoneInput from "react-native-phone-number-input";


import { Button, Dropdown, Input, Loading, SelectDialog } from "../../../../components";
import { useAuth } from "../../../../context/auth.context";
import auth from "../../../../service/auth.services";
import { validator } from "../../../../utils";


const USER_QUERY = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        id
        token
      }
    }
`

export default function SignupForm(props: any) {
    const phoneInput = useRef(null);

    const { checkUserAuthentication } = useAuth();
    const [signining, setSigninig] = useState(false)
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        mapUrl: "",
        phone: "",
        gender: "",
        avatar: "",
        birthdate: "",
        status: "",
    });

    const [isValid, setIsValid] = useState({ gender: true })


    const [Login] = useMutation(USER_QUERY, {
        onCompleted: (data) => {
            auth.setUser(data.login)
            checkUserAuthentication()
            setSigninig(false)
        },
        onError: (err) => {
            console.log(err)
            setSigninig(false)
        }
    });



    const signin = () => {
        setSigninig(true)
        Login({
            variables: {
                "input": user
            }
        });
    }

    return (
        <View style={{ width: "100%" }}>

            <View style={{ padding: 20, width: "100%", paddingBottom: 10 }}>
                <Input mode label="First Name"
                    error={!validator.validateName(user.firstName) && user.firstName !== ""}
                    onchange={(e: string) => setUser({ ...user, firstName: e })}
                />
            </View>

            <View style={{ padding: 20, width: "100%", paddingBottom: 10 }}>
                <Input mode label="Last Name"
                    error={!validator.validateName(user.lastName) && user.lastName !== ""}
                    onchange={(e: string) => setUser({ ...user, lastName: e })}
                />
            </View>

            <View style={{ padding: 20, width: "100%", paddingBottom: 10 }}>
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
                    }}
                    textContainerStyle={{
                        width: "100%",
                        elevation: 0,
                        backgroundColor: "white",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingBottom: 10,
                    }}
                    onChangeFormattedText={(text) => {
                    }}
                />
            </View>

            <View style={{ padding: 20, width: "100%", paddingBottom: 10 }}>
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
                    onselect={(e: any) => setUser({ ...user, gender: e.title })}
                    titleColor={isValid.gender ? "grey" : "red"}
                />
            </View>

            <View style={{ padding: 20, width: "100%", paddingBottom: 30 }}>
                <Dropdown />
            </View>


            <View style={{ padding: 20, width: "100%", paddingBottom: 10 }}>
                <Input mode label="Email"
                    error={!validator.validateEmail(user.email) && user.email !== ""}
                    onchange={(e: string) => setUser({ ...user, email: e })}
                    keyboard="email-address"
                    placeholder="e.g. example@example.com"
                />
            </View>

            <View style={{ padding: 20, width: "100%", paddingBottom: 30 }}>
                <Input mode label="Password"
                    onchange={(e: string) => setUser({ ...user, password: e })}
                    password
                />
            </View>

            <View style={{ padding: 15 }}>
                {signining ? (
                    <Loading />
                ) : (
                    <Button
                        disabled={user.email === "" || !validator.validateEmail(user.email) || user.password === "" ? true : false}
                        title="Continue"
                        onclick={signin}
                    />
                )}
            </View>
        </View>
    );
}
