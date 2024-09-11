import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

import ButtonIcon from "@/components/buttonIcon";
import { Col, Row } from "@/components/Flex";
import Carlist from "@/components/Carlist";
import { useState, useEffect } from "react";
import { router } from "expo-router";

import ParallaxFlatList from "@/components/ParallaxFlatList";
import { useSelector, useDispatch } from "react-redux";
import { getCars, selectCars } from "@/redux/reducers/car/carSlice";
import GeoLocation from "@/components/GeoLocation";
export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useSelector(selectCars);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCars(signal));
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Hi, Nama</Text>
            <GeoLocation style={styles.titleText} />
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/Ellipse 24.png")}
            />
          </View>
        </View>
      }
      banner={
        <View>
          <View>
            <View style={styles.banner}>
              <View style={styles.bannerContainer}>
                <View style={styles.bannerTextContainer}>
                  <Text style={styles.bannerText}>
                    Sewa Mobil Berkualitas di kawasanmu
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/(listcar)")}
                  >
                    <Text style={styles.logout}>Sewa Mobil</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image source={require("@/assets/images/img_car.png")} />
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Row justifyContent={"space-between"}>
                <Col>
                  <ButtonIcon
                    text={"Sewa Mobil"}
                    name={"car-outline"}
                    color={"#ffffff"}
                  />
                  <Text styles={styles.iconText}>Sewa Mobil</Text>
                </Col>
                <Col>
                  <ButtonIcon
                    text={"Oleh-Oleh"}
                    name={"cube-outline"}
                    color={"#ffffff"}
                  />
                  <Text styles={styles.iconText}>Oleh-oleh</Text>
                </Col>
                <Col>
                  <ButtonIcon
                    text={"Penginapan"}
                    name={"key-outline"}
                    color={"#ffffff"}
                  />
                  <Text styles={styles.iconText}>Penginapan</Text>
                </Col>
                <Col>
                  <ButtonIcon
                    text={"Wisata"}
                    name={"camera-outline"}
                    color={"#ffffff"}
                  />
                  <Text styles={styles.iconText}>Wisata</Text>
                </Col>
              </Row>
            </View>
            <View></View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "PoppinsBold",
                fontSize: 16,
                color: "#000",
                marginTop: 20,
                marginBottom: 16,
                marginTop: 16,
              }}
            >
              Daftar Mobil Pilihan
            </Text>
          </View>
        </View>
      }
      loading={loading}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Carlist
          style={{ marginHorizontal: 20 }}
          key={item.id}
          image={{ uri: item.image }}
          carName={item.name}
          passengers={6}
          baggage={4}
          price={item.price}
          onPress={() => router.navigate("(listcar)/details/" + item.id)}
        />
      )}
      viewabilityConfig={{
        waitForInteraction: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  titleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -100,
    overflow: "hidden",
    borderRadius: 5,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: "45%",
    padding: 15,
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
    marginTop: 10,
  },
  logout: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  iconText: {
    textAlign: "center",
    fontFamily: "PoppinsBold",
    color: "#fff",
  },
});
