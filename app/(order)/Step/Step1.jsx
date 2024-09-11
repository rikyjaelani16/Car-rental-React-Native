import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { selectCarsDetails } from "@/redux/reducers/car/carDetailsSlice";
import Carlist from "@/components/Carlist";
import {
  postOrder,
  putOrderSlip,
  selectOrder,
  setCarId,
} from "../../../redux/order/orderSlice";
import { selectlogin } from "../../../redux/authApi/loginSlice";
import moment from "moment";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethods = ["BCA", "MANDIRI", "BNI"];

export default function Step1({ setActiveStep, payment, setPayment }) {
  const [selectMethod, setSelectMethod] = useState(null);

  const dispatch = useDispatch();
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);
  const order = useSelector(selectOrder);
  const loginSlice = useSelector(selectlogin);
  const { data, isLoading } = useSelector(selectCarsDetails);

  const bayar = () => {
    console.log(bayar);
    dispatch(
      postOrder({
        formData: {
          start_rent_at: moment().format("YYYY-MM-DD"),
          finish_rent_at: moment().add(1, "day").format("YYYY-MM-DD"),
          car_id: data.id,
        },
        token: loginSlice.data.access_token,
      })
    );
    return !postOrder(setActiveStep(+1));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Carlist
          image={{ uri: data?.image }}
          carName={data.name}
          passengers={5}
          baggage={4}
          price={data?.price}
        />
        <Text style={styles.textBold}>Pilih Bank Transfer</Text>
        <Text style={styles.textBold}>
          Kamu bisa membayar dengan transfer melalui ATM, Internet Banking, atau
          Mobile Banking
        </Text>
        <View>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() =>
                payment === method ? setPayment("") : setPayment(method)
              }
              style={styles.paymentMethod}
            >
              <Text style={styles.paymentBox}>{method}</Text>
              <Text style={styles.paymentText}>{method} Transfer</Text>
              {payment === method ? (
                <Ionicons size={30} name={"checkmark"} color={"#5CB85F"} />
              ) : (
                ""
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text>% Pakai Kode Promo</Text>
          <View style={styles.promoContainer}>
            <TextInput
              placeholder="Tulis promomu disini"
              style={styles.formInput}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.paymentButtonText}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
          <TouchableOpacity
            disabled={payment === "" ? true : false}
            style={{
              ...styles.paymentButton,
              backgroundColor: payment === "" ? "#C9E7CA" : "#3D7B3F",
            }}
            onPress={() => {
              // setActiveStep(1);

              bayar();
              console.log(bayar);
            }}
          >
            <Text style={styles.paymentButtonText}>Lanjutkan Pembayaran</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
    backgroundColor: "#FFFFFF",
    padding: 20,
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: -160,
  },
  price: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 5,
    marginTop: 30,
  },
  paymentButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 5,
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsBold",
    fontSize: 14,
    textAlign: "center",
  },
});
