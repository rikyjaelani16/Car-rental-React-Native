import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useState } from "react";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(10, "Too Long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Required"),
});
export default function Register() {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // const [text, setText] = React.useState("");
  const handleSubmit = async (values) => {
    try {
      setModalVisible(true);
      setErrorMessage(null);
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            email: values.email,
            password: values.password,
            role: "Customer",
          }),
        }
      );
      const body = await req.json();
      console.log(body);
      if (body.message)
        throw new Error(
          body.message || body.errors[0].message || "something is Wrong!"
        );

      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.navigate("/");
      }, 500);
    } catch (e) {
      setErrorMessage(e.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 500);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
    }
  };
  return (
    <View>
      <Image source={require("@/assets/images/Group84Logo.png")} />
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
        }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Name*</Text>
              <TextInput
                onBlur={handleBlur("name")}
                onChangeText={handleChange("name")}
                style={styles.formInput}
                placeholder="Full Name"
              />
              {errors.name && touched.name ? (
                <Text style={styles.textyup}>{errors.name}</Text>
              ) : null}
              <Text></Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Email*</Text>
              <TextInput
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                style={styles.formInput}
                placeholder="Johndee2gmail.com"
              />
              {errors.email && touched.email ? (
                <Text style={styles.textyup}>{errors.email}</Text>
              ) : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Create Password*</Text>
              <TextInput
                style={styles.formInput}
                onBlur={handleBlur("password")}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                placeholder="6+ karakter"
              />
              {errors.password && touched.password ? (
                <Text style={styles.textyup}>{errors.password}</Text>
              ) : null}
            </View>
            <View style={styles.formContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.signIn}>Sign Up</Text>
              </TouchableOpacity>

              <Text style={styles.textRegister}>
                Already have an account?
                <Link href={"./"} style={styles.linkRegister}>
                  Sign In here
                </Link>
              </Text>
            </View>
          </>
        )}
      </Formik>
      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Ionicons size={32} color={"#A43333"} name="close-circle" />
              <Text style={styles.formLabel}>{errorMessage}</Text>
            </>
          ) : (
            <>
              <Ionicons size={32} color={"#3D7B3F"} name="checkmark-circle" />
              <Text style={styles.formLabel}>Berhasil Register!!</Text>
            </>
          )}
        </View>
      </ModalPopup>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontweight: 700,
    textAlign: "center",
    fontFamily: "PoppinsBold",
    marginVertical: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#0000001A",
  },
  textRegister: {
    marginTop: 10,
    textAlign: "center",
  },
  linkRegister: {
    color: "#0D28A6",
  },
  button: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
  },
  signIn: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins",
  },
  modalBackground: {
    width: "90%",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 4,
    padding: 30,
    alignItems: "center",
    fontFamily: "PoppinsBold",
    marginTop: 20,
  },
  textyup: {
    color: "#FA2C5A",
  },
});
