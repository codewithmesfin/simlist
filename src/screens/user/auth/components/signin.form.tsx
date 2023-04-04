import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { View } from "react-native";


import { Button, Input, Loading } from "../../../../components";
import { useAuth } from "../../../../context/auth.context";
import auth from "../../../../service/auth.services";
import { validator } from "../../../../utils";


const USER_QUERY = gql`
    mutation Login($input:UsersPermissionsLoginInput!) {
      login(input: $input) {
       jwt
      }
    }
`


export default function SigninForm(props: any) {
  const { checkUserAuthentication } = useAuth();
  const [signining, setSigninig] = useState(false)
  const [user, setUser] = useState({ email: "", password: "" });

  const [Login] = useMutation(USER_QUERY, {
    onCompleted: (data) => {
      const response = {
        __typename: data.login.__typename,
        token: data.login.jwt
      }
      auth.setUser(response)
      checkUserAuthentication()
      setSigninig(false)
    },
    onError: (err) => {
      setSigninig(false)
    }
  });

  const signin = () => {
    setSigninig(true)
    Login({
      variables: {
        "input": { identifier: user.email, password: user.password }
      }
    });
  }

  return (
    <View style={{ width: "100%" }}>

      <View style={{ padding: 10, width: "100%", }}>
        <Input
          label="Email"
          error={!validator.validateEmail(user.email) && user.email !== ""}
          onchange={(e: string) => setUser({ ...user, email: e })}
          keyboard="email-address"
          placeholder="e.g. example@example.com"
           mode
        />
      </View>
      <View style={{ padding: 10, width: "100%", paddingBottom: 20 }}>
        <Input label="Password"
          onchange={(e: string) => setUser({ ...user, password: e })}
          password  mode
        />
      </View>
      <View style={{ padding: 10 }}>
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