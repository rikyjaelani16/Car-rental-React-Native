import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { selectCarsDetails } from "@/redux/reducers/car/carDetailsSlice";
import Carlist from "@/components/Carlist";
import { Col, Row } from "@/components/Flex";
import CountDown from "react-native-countdown-component-maintained";
import moment from "moment-timezone";
import * as Clipboard from "expo-clipboard";
import { selectOrder } from "../../../redux/order/orderSlice";
const formattedDate = moment()
  .tz("Asia/Jakarta") // Set zona waktu ke WIB
  .locale("id") // Set bahasa ke Indonesia
  .format("dddd, DD MMM YYYY [jam] HH.mm [WIB]");
const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethods = ["BCA", "MANDIRI", "BNI"];
function getDate() {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return String(date24);
}
export default function Step3({
  setActiveStep,
  activeStep,
  payment,
  setPayment,
}) {
  const [selectMethod, setSelectMethod] = useState(null);
  const { slip } = useSelector(selectOrder);
  useEffect(() => {
    console.log(slip.slip);
  }, []);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);
  const copyToclipboard = async (text) => {
    await Clipboard.setStringAsync(text.toString());
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.paymentText}>Invoice</Text>
        </View>
        <Row>
          <View style={styles.norek}>
            <Text style={styles.paymentText}>INV/xx/xx-xxxx/</Text>
          </View>
          <Pressable onPress={() => copyToclipboard("xxxx-xxxx-xxxx")}>
            <Ionicons
              size={25}
              marginTop={10}
              marginLeft={-40}
              name="download-outline"
              color={"#3C3C3C"}
            />
          </Pressable>
        </Row>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.paymentText}>E-Tiket</Text>
        </View>

        <View style={styles.etiket}>
          <View style={{ alignItems: "center" }}>
            {slip.slip ? (
              <Image
                source={{ uri: slip.slip }}
                style={{ width: 350, height: 250 }}
              />
            ) : (
              <Row>
                <Col>
                  <Text style={{ marginTop: 100, marginRight: 10 }}>
                    PDF Viewer
                  </Text>
                </Col>
                <Col>
                  <Ionicons
                    size={25}
                    marginTop={100}
                    marginLeft={0}
                    name="image-outline"
                    color={"#3C3C3C"}
                  />
                </Col>
              </Row>
            )}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 10, marginTop: 30, marginBottom: 180 }}>
            Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.showpaymentButton}
          onPress={() => {
            setActiveStep(1);
          }}
        >
          <Text style={styles.showpaymentButtonText}>Lihat Daftar Pesanan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    fontFamily: "Poppins",
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,

    borderBottomWidth: 1,
    borderColor: "#D0D0D0",
    marginBottom: 10,
  },
  paymentBox: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#D0D0D0",
    marginRight: 10,
    width: "30%",
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  formInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  applyButton: {
    backgroundColor: "#3D7B3F",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  footer: {
    position: "fixed",
    backgroundColor: "#EEEEEEE",
    padding: 20,
    bottom: 0,
    left: 0,
    right: 0,
    fontFamily: "Poppins",
    // marginTop: -20,
  },
  price: {
    fontSize: 15,
    fontFamily: "PoppinsBold",
    marginBottom: 5,
    // marginTop: 30,
  },
  paymentButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#3D7B3F",
    marginBottom: 10,
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsBold",
    fontSize: 14,
    textAlign: "center",
  },
  showpaymentButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,

    fontFamily: "Poppins",
    backgroundColor: "#FFFFFF",
  },
  showpaymentButtonText: {
    color: "#3D7B3F",
    fontFamily: "PoppinsBold",
    fontSize: 14,

    textAlign: "center",
  },
  norek: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#3C3C3C",
    backgroundColor: "#FFFFFF",
    width: 350,
    height: 36,
    fontFamily: "Poppins",
  },
  paymentTextname: {
    flex: 1,
    fontSize: 12,
    marginLeft: 118,
    marginTop: -50,
    color: "#3C3C3C",
    fontFamily: "Poppins",
  },
  etiket: {
    width: 350,
    height: 250,
    top: 20,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderStyle: "dashed",
    borderColor: "#D0D0D0",
    fontFamily: "Poppins",
  },
});
