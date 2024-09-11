import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Row, Col } from "@/components/Flex";
import Carlist from "@/components/Carlist";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";

import { selectCarsDetails } from "../../../../redux/reducers/car/carDetailsSlice";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
export default function payment({ setActivePage }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isbca, setbca] = useState(false);
  const [ismandiri, setmandiri] = useState(false);
  const buttonTextStyle = {
    color: "#ffff",
  };
  const { id } = useLocalSearchParams();
  const { data } = useSelector(selectCarsDetails);
  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <View style={style.iconBack}>
        <TouchableOpacity onPress={() => router.push("/(listcar)")}>
          <Ionicons
            size={40}
            marginTop={20}
            name="arrow-back-outline"
            color={"#000000"}
          />
          <Text style={style.textPayment}>Pembayaran</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: -50,
          marginBottom: 50,
          flex: 1,
        }}
      >
        <ProgressSteps activeLabelColor="#000">
          <ProgressStep label="pilih Metode">
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  borderColor: "#ffffff",
                }}
              >
                <Carlist
                  style={{ marginHorizontal: 20 }}
                  image={{ uri: data.image }}
                  carName={data.name}
                  pasengger={5}
                  baggage={4}
                  price={data.price}
                  onPress={() =>
                    router.navigate("(listcar)/details/" + data.id)
                  }
                />
              </View>
              <View style={style.borderText}>
                <View>
                  <Text style={style.textPayment}>Pilih Bank Transfer</Text>
                </View>
                <Text style={style.textPayment}>
                  Kamu bisa membayar dengan transfer melalui ATM, Internet
                  Banking atau Mobile Banking
                </Text>
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    style={style.Viewborder}
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    <Row style={style.container}>
                      <Col style={style.border}>
                        <Text>BCA</Text>
                      </Col>
                      <Col style={style.textcontainer}>
                        <Text style={style.TextBorder}>BCA Transfer</Text>
                      </Col>
                      <Col>
                        {isVisible && (
                          <Ionicons
                            size={30}
                            name="checkmark-outline"
                            color={"#5CB85F"}
                            marginLeft={90}
                            marginTop={20}
                          />
                        )}
                      </Col>
                    </Row>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={style.Viewborder}
                    onPress={() => setbca(!isbca)}
                  >
                    <Row style={style.container}>
                      <Col style={style.border}>
                        <Text>BNI</Text>
                      </Col>
                      <Col style={style.textcontainer}>
                        <Text style={style.TextBorder}>BNI Transfer</Text>
                      </Col>
                      <Col>
                        {isbca && (
                          <Ionicons
                            size={30}
                            name="checkmark-outline"
                            color={"#5CB85F"}
                            marginLeft={90}
                            marginTop={20}
                          />
                        )}
                      </Col>
                    </Row>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={style.Viewborder}
                    onPress={() => setmandiri(!ismandiri)}
                  >
                    <Row style={style.container}>
                      <Col style={style.border}>
                        <Text>Mandiri</Text>
                      </Col>
                      <Col style={style.textcontainer}>
                        <Text style={style.TextBorder}>Mandiri Transfer</Text>
                      </Col>
                      <Col>
                        {ismandiri && (
                          <Ionicons
                            size={30}
                            name="checkmark-outline"
                            color={"#5CB85F"}
                            marginLeft={40}
                            marginTop={20}
                            aria-hidden="false"
                          />
                        )}
                      </Col>
                    </Row>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <View>
                  <Text style={style.TextBorder}>% Pakai Kode Promo</Text>
                </View>
                <Row style={style.containerpayment}>
                  <Col>
                    <TextInput
                      style={{ textAlign: "center", color: "#8A8A8A" }}
                    >
                      <Text>Tulis catatanmu di sini</Text>
                    </TextInput>
                  </Col>
                  <Col></Col>
                  <Pressable
                    style={style.buttonpayment}
                    onPress={() => router.push()}
                  >
                    <Text style={style.signIn}>Terapkan</Text>
                  </Pressable>
                </Row>
              </View>
              <View>
                <View style={style.footer}>
                  <Text style={style.textprice}>
                    {formatCurrency.format(data.price)}
                  </Text>
                  <Pressable
                    setmandiri
                    setbca
                    setIsVisible
                    disabled={true}
                    style={style.button}
                    onPress={() => router.push()}
                  >
                    <Text style={style.signIn}>Bayar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ProgressStep>
          <ProgressStep label="Bayar">
            <View style={{ alignItems: "center" }}></View>
          </ProgressStep>
          <ProgressStep label="Tiket">
            <View style={{ alignItems: "center" }}></View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  textPayment: {
    textAlign: "left",
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginTop: -25,
    marginLeft: 50,
  },
  textprice: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  footer: {
    // position: "fixed",
    backgroundColor: "#eeeeee",
    padding: 20,
    marginTop: 20,
  },
  signIn: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  button: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
    gap: 10,
    height: 36,
    width: 328,
    top: 10,
  },
  textPayment: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginLeft: 60,
    marginBottom: 50,
    marginTop: -30,
  },
  iconBack: {
    marginTop: 20,
  },
  borderText: {
    marginTop: 40,
    marginLeft: -50,
  },
  textStepper: {
    color: "#0000",
    fontFamily: "PoppinsBold",
    fontSize: 12,
  },
  container: {
    width: 328,
    // height: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  textcontainer: {
    marginTop: 12,
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 20,
  },
  border: {
    borderWidth: 25,
    borderColor: "#0000",
    borderRadius: 5,
    backgroundColor: "#D0D0D0",
  },
  TextBorder: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  Viewborder: {
    marginBottom: 10,
  },
  buttonpayment: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
    gap: 10,
    height: 36,
    width: 94,
    marginLeft: 62,
  },
  containerpayment: {
    width: 300,
    // height: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});
