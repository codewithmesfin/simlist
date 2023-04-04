import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { BottomSnackbar, SimpleModal } from "../components";
import { useAuth } from "../context/auth.context";
import { usePopup } from "../context/popup.context";
import { useSnackbar } from "../context/snackbar.context";
import PrivateRoute from "./private.route";
import PublicRoute from "./public.route";

export default function Routes() {
  const { isAuthenticated } = useAuth();
  const { open, snackbarProps, openSnackbar } = useSnackbar();

  const { open: showPopup, popupProps, openPopup } = usePopup();


  return (
    <View>
      <View style={{ height: "100%" }}>
        <NavigationContainer>
          {isAuthenticated ? <PrivateRoute /> : <PublicRoute />}
          {/* openPopup  */}
          {showPopup && <SimpleModal
            onBtnClick={() => openPopup({
              title: "",
              subtitle: "",
              btnText: "",
              type: "",
              navigate: ""
            })}

            open={showPopup}
            title={popupProps.title}
            subtitle={popupProps.subtitle}
            type={popupProps.type}
            btnText={popupProps.btnText}
            navigate={popupProps.navigate}
          />}
          {/* openPopup  */}
        </NavigationContainer>
      </View>
      {/* Bottom Snack bar */}
      {open && <BottomSnackbar
        onBtnClick={() => openSnackbar({
          title: "",
          subtitle: "",
          btnText: "",
          type: "",
        })}

        open={open}
        title={snackbarProps.title}
        subtitle={snackbarProps.subtitle}
        type={snackbarProps.type}
        btnText={snackbarProps.btnText}
      />}
      {/* Bottom Snack bar */}


    </View>
  );
}
