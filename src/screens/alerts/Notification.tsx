import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Bottomsheet, Toolbar } from "../../components";
import { color as constants } from "../../utils";
import { Avatar } from "react-native-paper";
import { EvilIcons,Entypo,MaterialIcons } from "@expo/vector-icons";

export default function Notifications() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const sheetItems:any = [
    {
      icon:<Entypo name="unread" size={24} color="black" />,
      title:"Mark as read"
    },
    {
      icon:<MaterialIcons name="delete-sweep" size={24} color="black" />,
      title:"Delete notification"
    },
    {
      icon:<MaterialIcons name="rate-review" size={24} color="black" />,
      title:"View detail"
    },
    {
      icon:<EvilIcons name="share-google" size={24} color="black" />,
      title:"Share notification"
    }
  ];
  const items = [
    {
      title: "Lorem ipsum doler",
      subtitle: "invited you to follow a page. You recently liked their post.",
      time: "24 hours ago",
      read: false,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYU8ayHqMuoH0QIu_UdjqFMTInp-DG8D4yxT17h_sonhXlBLJYlm3z-Zjow_bt085rhx4&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "invited you to follow a page. You recently liked their post.",
      time: "24 hours ago",
      read: false,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYU8ayHqMuoH0QIu_UdjqFMTInp-DG8D4yxT17h_sonhXlBLJYlm3z-Zjow_bt085rhx4&usqp=CAU",
    },

    {
      title: "Lorem ipsum doler",
      subtitle: "Lorem ipsum doler sit amet doler ipsum",
      time: "24 hours ago",
      read: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHqFL_XoLC7x1onY_BcwSLskANCrxFYFUxen4UwrqhJeDujbhN70xXCTr4r4Ewc_2lro&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "invited you to follow a page. You recently liked their post.",
      time: "24 hours ago",
      read: false,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4uK4CIKVlpxhpQn8XgOKBsH2fj4HcwtDZYTiwRwVi4hxqVB9WorAipb5hw7l-jOAPMh4&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "Lorem ipsum doler sit amet doler ipsum",
      time: "24 hours ago",
      read: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHqFL_XoLC7x1onY_BcwSLskANCrxFYFUxen4UwrqhJeDujbhN70xXCTr4r4Ewc_2lro&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "Lorem ipsum doler sit amet doler ipsum",
      time: "24 hours ago",
      read: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHqFL_XoLC7x1onY_BcwSLskANCrxFYFUxen4UwrqhJeDujbhN70xXCTr4r4Ewc_2lro&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "invited you to follow a page. You recently liked their post.",
      time: "24 hours ago",
      read: false,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYU8ayHqMuoH0QIu_UdjqFMTInp-DG8D4yxT17h_sonhXlBLJYlm3z-Zjow_bt085rhx4&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "invited you to follow a page. You recently liked their post.",
      time: "24 hours ago",
      read: false,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYU8ayHqMuoH0QIu_UdjqFMTInp-DG8D4yxT17h_sonhXlBLJYlm3z-Zjow_bt085rhx4&usqp=CAU",
    },

    {
      title: "Lorem ipsum doler",
      subtitle: "Lorem ipsum doler sit amet doler ipsum",
      time: "24 hours ago",
      read: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHqFL_XoLC7x1onY_BcwSLskANCrxFYFUxen4UwrqhJeDujbhN70xXCTr4r4Ewc_2lro&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "invited you to follow a page. You recently liked their post.",
      time: "24 hours ago",
      read: false,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4uK4CIKVlpxhpQn8XgOKBsH2fj4HcwtDZYTiwRwVi4hxqVB9WorAipb5hw7l-jOAPMh4&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "Lorem ipsum doler sit amet doler ipsum",
      time: "24 hours ago",
      read: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHqFL_XoLC7x1onY_BcwSLskANCrxFYFUxen4UwrqhJeDujbhN70xXCTr4r4Ewc_2lro&usqp=CAU",
    },
    {
      title: "Lorem ipsum doler",
      subtitle: "Lorem ipsum doler sit amet doler ipsum",
      time: "24 hours ago",
      read: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHqFL_XoLC7x1onY_BcwSLskANCrxFYFUxen4UwrqhJeDujbhN70xXCTr4r4Ewc_2lro&usqp=CAU",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Toolbar back />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View>
              {items.map((x, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',

                    backgroundColor: x.read ? "white" : constants.light,
                    padding: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <View>
                      <Avatar.Image
                        source={{
                          uri: x.avatar,
                        }}
                        size={60}
                      />
                    </View>
                    <View style={{ padding: 10, flex: 1 }}>
                      <Text style={{ fontWeight: "700", fontSize: 16 }}>
                        {x.title}
                        <Text style={{ fontWeight: "400", fontSize: 14 }}>
                          {" "}
                          {x.subtitle}
                        </Text>
                      </Text>
                      <Text
                        style={{ paddingTop: 5, color: "grey", fontSize: 12 }}
                      >
                        {x.time}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Bottomsheet
                    items={sheetItems}
                   isVertical
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
