import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { View} from "react-native";


import { Button, Input, Loading } from "../../../../components";
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

export default function SigninForm(props: any) {
  const { checkUserAuthentication } = useAuth();
  const [signining, setSigninig] = useState(false)
  const [user, setUser] = useState({ email: "", password: "" });


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
