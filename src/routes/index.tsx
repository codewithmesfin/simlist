import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { BottomSnackbar } from "../components";
import { useAuth } from "../context/auth.context";
import { useSnackbar } from "../context/snackbar.context";
import PrivateRoute from "./private.route";
import PublicRoute from "./public.route";

export default function Routes() {
  const { isAuthenticated } = useAuth();
  const { open, snackbarProps, openSnackbar } = useSnackbar();

  return (
    <View>
      <View style={{ height: "100%" }}>
        <NavigationContainer>
          {isAuthenticated ? <PrivateRoute /> : <PublicRoute />}
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
