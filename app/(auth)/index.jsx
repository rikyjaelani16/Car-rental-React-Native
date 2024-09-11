import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Link, router } from "expo-router";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import * as secureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import {
  closeModal,
  fetchlogin,
  selectlogin,
} from "../../redux/authApi/loginSlice";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});
const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Required"),
});
async function save(key, value) {
  await secureStore.setItemAsync(key, value);
}
export default function Login() {
  const dispatch = useDispatch();
  const { errorMessage, isModalVisible, isError } = useSelector(selectlogin);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };

  const handleSubmitFetch = async (values) => {
    dispatch(fetchlogin(values));
  };

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal());
        if (!isError) router.replace("../(tabs)");
      }, 2000);
    }
  }, [isModalVisible]);
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { data } = await GoogleSignin.signIn();

      console.log("test", data.idToken, googleCredential);
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
  }

  function onAuthStateChanged(user) {
    // setUser(user);
    console.log(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View>
      <Image source={require("@/assets/images/Group84Logo.png")} />
      <Text style={styles.title}>Welcome Back!</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => handleSubmitFetch(values)}
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
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Johndee2gmail.com"
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />
              {errors.email && touched.email ? (
                <Text style={styles.textyup}>{errors.email}</Text>
              ) : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                style={styles.formInput}
                secureTextEntry={true}
                placeholder="6+ karakter"
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
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
                <Text style={styles.signIn}>Sign In</Text>
              </TouchableOpacity>

              <Text style={styles.textRegister}>
                Dont have any acount?
                <Link href={"/Register"} style={styles.linkRegister}>
                  Sign up for free
                </Link>
              </Text>
              <View>
                <Text>or</Text>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={onGoogleButtonPress}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Ionicons size={32} color={"#A43333"} name="close-circle" />
              <Text style={styles.formLabel}>{errorMessage}</Text>
            </>
          ) : (
            <>
              <Ionicons size={32} color={"#3D7B3F"} name="checkmark-circle" />
              <Text style={styles.formLabel}>Berhasil Login!!</Text>
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
