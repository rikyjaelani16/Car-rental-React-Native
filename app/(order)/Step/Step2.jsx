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
import { useLocalSearchParams, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { selectCarsDetails } from "@/redux/reducers/car/carDetailsSlice";
import Carlist from "@/components/Carlist";
import { Col, Row } from "@/components/Flex";
import CountDown from "react-native-countdown-component-maintained";
import moment from "moment-timezone";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { selectlogin } from "../../../redux/authApi/loginSlice";
import orderSlice, {
  postOrder,
  putOrderSlip,
  selectOrder,
  setCarId,
} from "@/redux/order/orderSlice";
import { setStateByname } from "../../../redux/order/orderSlice";
import { ErrorMessage } from "formik";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import carDetailsSlice from "../../../redux/reducers/car/carDetailsSlice";
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
export default function Step2({
  setActiveStep,
  activeStep,
  payment,
  setPayment,
}) {
  const dispatch = useDispatch();
  const [selectMethod, setSelectMethod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const formatIDR = useCallback((price) => formatCurrency.format(price), []);
  const copyToclipboard = async (text) => {
    await Clipboard.setStringAsync(text.toString());
  };
  const car = useSelector(selectCarsDetails);
  const { status, data } = useSelector(selectOrder);
  const login = useSelector(selectlogin);
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName || "image",
        type: result.assets[0].mimeType,
      });
    }
  };
  const handleUpload = () => {
    if (image) {
      const formData = new FormData();
      formData.append("slip", image);
      dispatch(
        putOrderSlip({
          token: login.data.access_token,
          id: data.id,
          formData,
        })
      );
    }
  };
  useEffect(() => {
    if (status === "upload-success") {
      console.log(status);
      setTimeout(() => {
        setActiveStep(2);
        setModalVisible(false);
      }, 1500);
    } else {
      console.log(ErrorMessage);
    }
  }, [status]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Row>
          <Col>
            <Text style={styles.textBold}>Selesaikan Pembayaran Sebelum</Text>
          </Col>
          <Col>
            <CountDown
              until={60}
              onFinish={() => {
                setActiveStep(0);
                alert("Waktu Habis");
              }}
              size={12}
              timeToShow={["H", "M", "S"]}
              timeLabels={{ h: null, m: null, s: null }}
              digitTxtStyle={{ color: "#ffffff" }}
              digitStyle={{ backgroundColor: "#FA2C5A" }}
            />
          </Col>
        </Row>
        <Text style={styles.textBold}>{getDate()}</Text>
        <Carlist
          image={{ uri: car.data.image }}
          carName={car.data.name}
          passengers={5}
          baggage={4}
          price={car.data.price}
        />
        <Text style={styles.textBold}>Lakukan Transfer ke</Text>

        <View style={styles.paymentMethod}>
          <Text style={styles.paymentBox}>{payment}</Text>
          <Text style={styles.paymentText}>{payment} Transfer</Text>
        </View>
        <View>
          <Text style={styles.paymentTextname}>a.n Jeep Bromo Online</Text>
        </View>
        <View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.paymentText}>Nomor Rekening</Text>
          </View>
          <Row>
            <View style={styles.norek}>
              <Text style={styles.paymentText}>xxxx-xxxx-xxxx</Text>
            </View>

            <Pressable onPress={() => copyToclipboard("xxxx-xxxx-xxxx")}>
              <Ionicons
                size={25}
                marginTop={10}
                marginLeft={-40}
                name="copy-outline"
                color={"#3C3C3C"}
              />
            </Pressable>
          </Row>
        </View>
        <View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.paymentText}>Total Bayar</Text>
          </View>
          <Row>
            <Col>
              <View style={styles.norek}>
                <Text style={styles.paymentText}>
                  {formatIDR(data.price || 0)}
                </Text>
              </View>
            </Col>
            <Col>
              <Pressable onPress={() => copyToclipboard(data.price)}>
                <Ionicons
                  size={25}
                  marginTop={10}
                  marginLeft={-40}
                  name="copy-outline"
                  color={"#000000"}
                />
              </Pressable>
            </Col>
          </Row>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
        </Text>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.paymentButtonText}>Lanjutkan Pembayaran</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showpaymentButton}
          onPress={() => setActiveStep(2)}
        >
          <Text style={styles.showpaymentButtonText}>Lihat Daftar Pesanan</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} style={{ paddingTop: 100 }}>
        <View>
          <View style={{ marginTop: 50 }}>
            <Text style={styles.textModal}>Konfirmasi Pembayaran</Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.textModal}>
              Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
              akan segera kami cek tunggu kurang lebih 10 menit untuk
              mendapatkan konfirmasi.
            </Text>
          </View>

          <CountDown
            until={600}
            onFinish={() => {
              setActiveStep(0);
              alert("Waktu Habis");
            }}
            size={12}
            timeToShow={["M", "S"]}
            timeLabels={{ m: null, s: null }}
            digitTxtStyle={{ color: "#ffffff" }}
            digitStyle={{ backgroundColor: "#FA2C5A" }}
          />
          <View style={{ marginTop: 20 }}>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                Upload Bukti Pembayarann
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.textModal}>
                Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa
                upload bukti bayarmu
              </Text>
            </View>
          </View>
          <Pressable onPress={pickImage}>
            <View style={styles.etiket}>
              <View style={{ alignItems: "center" }}>
                {image ? (
                  <Image source={{ uri: image.uri }} style={styles.image} />
                ) : (
                  <Row>
                    <Col>
                      <Ionicons
                        size={30}
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
          </Pressable>
          <View style={styles.footermodal}>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handleUpload}
            >
              <Text style={styles.paymentButtonText}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.showpaymentButton}
              onPress={() => {
                setModalVisible(false);
                // Slip();
              }}
            >
              <Text style={styles.showpaymentButtonText}>
                Lihat Daftar Pesanan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
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
    marginTop: -20,
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
    // marginTop: 5,
    backgroundColor: "#FFFFFF",
    borderColor: "#3D7B3F",
    borderWidth: 1,
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
    borderColor: "EEEEEE",
    backgroundColor: "#EEEEEE",
    width: 350,
    height: 36,
    marginBottom: 20,
  },
  paymentTextname: {
    flex: 1,
    fontSize: 16,
    marginLeft: 118,
    marginTop: -50,
  },
  footermodal: {
    position: "fixed",
    backgroundColor: "#EEEEEEE",
    padding: 20,
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 70,
  },
  textModal: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    textAlign: "center",
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
    marginTop: 30,
    marginLeft: 20,
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 5,
  },
});
