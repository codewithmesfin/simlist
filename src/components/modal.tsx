import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,

} from "react-native";
import { Dialog, Portal, Provider as PaperProvider } from "react-native-paper";
import { BottomSheet } from "react-native-btr";


interface PROPS{
children?:any
toggle:boolean
close:()=>void
title?:any
buttons?:any
style?:any
bottom?:boolean
height?:number |undefined
padding?:number | undefined
}
const CustomModal = ({
  children,
  toggle,
  close,
  title,
  buttons,
  style,
  bottom,
  height,
  padding
}:PROPS) => {
  const [visible, setVisible] = useState(toggle);

  const hideDialog = () => {
    setVisible(false);
    close();
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return bottom ? (
    <View>
      <View style={styles.container}>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View
            style={[
              styles.bottomNavigationView,
              { height: height ? height : 200,padding:padding?padding:20,paddingTop:20 },
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    height: 5,
                    backgroundColor: "grey",
                    borderRadius: 30,
                    width: 50,
                    marginBottom: 10,
                  }}
                  onPress={toggleBottomNavigationView}
                ></TouchableOpacity>
              </View>
             
              <View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={{padding: padding?padding :20}}>
                    {children}
                    {buttons}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </View>
  ) : (
    <PaperProvider>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={style}>
            <Dialog.Content>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                {title}
              </View>
              {children}
              <View
                style={{
                  marginTop: 20,
                }}
              >
                {buttons}
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "80%",
    justifyContent: "center",
    padding: 15,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
});
