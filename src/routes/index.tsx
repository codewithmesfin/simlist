import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {  View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SimpleModal } from "../components";
import useAuthenticated from "../hooks/useAuthenticated";
import {
  closePopup,
  selectIsPopupOpen,
} from "../stores/slices/simple.modal.slice";
import PrivateRoute from "./private.route";
import PublicRoute from "./public.route";


export default function Routes() {
  const { open, title, subtitle, btnText } = useSelector(selectIsPopupOpen);
  const { authenticated } = useAuthenticated();
  const dispatch = useDispatch();
  return (
    <View>
    <View style={{height:'100%'}}>
    <NavigationContainer>
      {authenticated ? <PrivateRoute /> : <PublicRoute />}
    </NavigationContainer>
    </View>
    {open && (
        <SimpleModal
          onBtnClick={() => dispatch(closePopup())}
          open={open}
          title={title}
          subtitle={subtitle}
          btnText={btnText}
        />
      )}
    </View>
  );
}
