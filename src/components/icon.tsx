import React from "react";
import { MaterialIcons, Ionicons, Feather, FontAwesome5, AntDesign } from "@expo/vector-icons";

interface PROPS {
  size?: number;
  color?: string;
  name: string;
}

export default function Icon({ name, size, color }: PROPS) {
  const icons = {
    visible: <MaterialIcons name="visibility" size={size ? size : 24} color={color ? color : "black"} />,
    invisble: <MaterialIcons name="visibility-off" size={size ? size : 24} color={color ? color : "black"} />,
    back: <Ionicons name="chevron-back-outline" size={size ? size : 24} color={color ? color : "black"} />,
    search: <Feather name="search" size={size ? size : 24} color={color ? color : "black"} />,
    notification: <Ionicons name="notifications-outline" size={size ? size : 24} color={color ? color : "black"} />,
    user: <FontAwesome5 name="user-alt" size={size ? size : 24} color={color ? color : "black"} />,
    save: <AntDesign name="save" size={24} color="black" />,
    report: <MaterialIcons name="bug-report"  size={size ? size : 24} color={color ? color : "black"}/>,
    close:<AntDesign name="closecircle" size={size ? size : 24} color={color ? color : "black"}/>
  };
  return <>{icons[name]}</>;
}
