import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { selectlogin, logout } from "../../redux/authApi/loginSlice";
async function getUserEmail() {
  try {
    const userData = await SecureStore.getItemAsync("user");
    if (userData) {
      const userObject = JSON.parse(userData);
      return userObject.email || "Email tidak ditemukan";
    }
    return "User tidak ditemukan";
  } catch (error) {
    console.error("Error mengambil email:", error);
    return "Terjadi kesalahan saat mengambil email";
  }
}

export default function Profile() {
  const { data, islogin } = useSelector(selectlogin); // bang amir
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function fetchUserEmail() {
      const user = await secureStore.getItem("user");
      if (user) {
        const userObject = JSON.stringify(user);
        setEmail(userObject.email);
      }
      console.log(user);
    }

    fetchUserEmail();
  }, []);

  return (
    <View style={styles.titleContainer}>
      {islogin ? (
        <View>
          <Text style={styles.textStyles}>Akun</Text>
          <View style={styles.img}>
            <Image
              source={require("../../assets/images/Allura - Park 1.png")}
            />
          </View>
          <View style={styles.imageLogo}>
            <Image source={require("@/assets/images/Ellipse 24.png")} />
          </View>
          <View>
            <Text style={styles.textlogout}>Hallo! {data.email}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch(logout());
              router.replace("/(auth)");
            }}
          >
            <Text style={styles.buttonlogout}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.textStyles}>Akun</Text>
          <View style={styles.img}>
            <Image
              source={require("../../assets/images/Allura - Park 1.png")}
            />
          </View>
          <View style={styles.imageLogo}>
            <Image source={require("@/assets/images/Ellipse 24.png")} />
          </View>
          <View>
            <Text style={styles.textlogout}>
              Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
              TMMIN Car Rental lebih mudah
              {data.email}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonreg}
            onPress={() => router.replace("/(auth)/Register")}
          >
            <Text style={styles.buttonlogout}>register Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 20,
    marginTop: Constants.statusBarHeight,
  },
  img: {
    marginTop: 100,
    marginLeft: 20,
    width: 312,
    height: 192,
    alignItems: "center",
    borderColor: "#000",
  },
  textStyle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#000",
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  textStyles: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#000",
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#AF392F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
    marginLeft: 130,
    marginRight: 130,
    marginTop: 50,
  },
  buttonlogout: {
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  textlogout: {
    color: "#00000",
    textAlign: "center",
    fontFamily: "PoppinsBold",
    marginBottom: 40,
  },
  imageLogo: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: -50,
  },
  buttonreg: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
    marginLeft: 130,
    marginRight: 130,
    marginTop: 50,
  },
});
