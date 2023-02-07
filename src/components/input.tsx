import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

interface PROPS {
  onchange?: any;
  label?: any;
  mode?: any;
  value?: any;
  error?: any;
  right?: any;
  password?: boolean;
  placeholder?: string;
  showPassword?: any;
  keyboard?: any;
  style?: any;
  multiline?: boolean;
  lines?: number;
  disabled?: boolean;
  large?: boolean;
}

export default function Input({
  onchange,
  label,
  mode,
  value,
  error,
  right,
  password,
  placeholder,
  showPassword,
  keyboard,
  style,
  multiline,
  lines,
  disabled,
  large,
}: PROPS) {
  return (
    <View style={style}>
      <TextInput
        label={label}
        placeholder={placeholder}
        mode={mode ? mode : "outlined"}
        value={value}
        onChangeText={(text) => onchange(text)}
        dense={large ? false : true}
        error={error}
        secureTextEntry={password ? true : false}
        keyboardType={keyboard}
        style={{ backgroundColor: "white" }}
        multiline={multiline}
        numberOfLines={lines}
        disabled={disabled}
        theme={{
          colors: {
            primary: "#2196f3",
          },
        }}
      />
    </View>
  );
}
