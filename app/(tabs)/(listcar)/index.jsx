import { View, StyleSheet, Text, FlatList } from "react-native";
import Constants from "expo-constants";
import React from "react";
import Carlist from "@/components/Carlist";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { getCars, selectCars } from "@/redux/reducers/car/carSlice";
export default function listCar() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector(selectCars);

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCars(signal));
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <View style={styles.titleContainer}>
      <Text
        style={{
          fontFamily: "PoppinsBold",
          fontSize: 16,
          color: "#000",
          marginTop: 16,
          marginBottom: 16,
          marginTop: 16,
        }}
      >
        Daftar Mobil
      </Text>

      <FlatList
        loading={loading}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Carlist
            style={{ marginHorizontal: 20 }}
            image={{ uri: item.image }}
            carName={item.name}
            pasengger={5}
            baggage={4}
            price={item.price}
            onPress={() => router.navigate("(listcar)/details/" + item.id)}
          />
        )}
        viewabilityConfig={{
          waitForInteraction: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#ffffff",
  },
});
