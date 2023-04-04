import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Input, MiniNavbar } from "../../components";
import Link from "../../components/link";
import SelectDialog from "../../components/select.dialog";
import {color as  constants } from "../../utils";

export default function AddMarketplace() {
  const [item, setItem] = useState({ role: "",
location:"",address:"",website:"",companyName:""
});
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <MiniNavbar
        title="Register your marketplace"
        right={
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: constants.primary,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View>
              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    paddingBottom: 15,
                  }}
                >
                  Detailed information
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Dear customer, please add your business address and Company
                  Information so that customers fill find you easily.
                </Text>
              </View>
              <View style={{ paddingBottom: 30 }}>
                <Input
                  label="Name"
                  large
                  onchange={(e: string) =>{}}
                />
              </View>
              <View style={{ paddingBottom: 20 }}>
                <SelectDialog
                  title={
                    item?.role === ""
                      ? "marketplace type"
                      : "marketplace type" + ": " + item?.role
                  }
                  items={[
                    { title: "Chief Executive Officer" },
                    { title: "General Manager" },
                    { title: "Sales Manaager" },
                    { title: "Sales Representative" },
                    { title: "Seller" },
                  ]}
                  height={360}
                  // borderColor={isValid.condition ? "grey" : "red"}
                  onselect={(e: any) => setItem({ ...item, role: e.title })}
                  // titleColor={isValid.condition ? "grey" : "red"}
                />
              </View>
              <View style={{ paddingBottom: 30 }}>
                <Input
                  label="Website (optional)"
                  large
                  onchange={(e: string) => setItem({ ...item, website: e })}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  <Text>Don't have website?</Text>
                  <Link title="Create Now" />
                </View>
              </View>
              <View style={{ paddingBottom: 30 }}>
                <SelectDialog
                  title={
                    item?.role === ""
                      ? "your role"
                      : "your role" + ": " + item?.role
                  }
                  items={[
                    { title: "Chief Executive Officer" },
                    { title: "General Manager" },
                    { title: "Sales Manaager" },
                    { title: "Sales Representative" },
                    { title: "Seller" },
                  ]}
                  height={360}
                  // borderColor={isValid.condition ? "grey" : "red"}
                  onselect={(e: any) => setItem({ ...item, role: e.title })}
                  // titleColor={isValid.condition ? "grey" : "red"}
                />
              </View>
              <View style={{ paddingBottom: 30 }}>
                <Input
                  label="Address"
                  placeholder="E.g. Merkato, Addis Ababa"
                  large
                  onchange={(e: string) => setItem({ ...item, address: e })}
                />
              </View>
              <View style={{ paddingBottom: 30 }}>
                <SelectDialog
                  title={
                    item?.location === ""
                      ? "location on map"
                      : "location on map" + ": " + item?.location
                  }
                  items={[]}
                  height={360}
                  // borderColor={isValid.condition ? "grey" : "red"}
                  onselect={(e: any) => setItem({ ...item, location: e.title })}
                  // titleColor={isValid.condition ? "grey" : "red"}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
