import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row } from "@/components/Flex";
const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function CarList({
  carName,
  pasengger,
  baggage,
  price,
  image,
  onPress,
}) {
  return (
    <Pressable style={{ ...style.card, ...style }} onPress={onPress}>
      <Row alignItem={"center"} gap={16}>
        <Col>
          <Image style={style.img} source={image} />
        </Col>
        <Col>
          <Text style={style.carName}>{carName}</Text>
          <Row gap={16}>
            <Row>
              <Ionicons size={12} name="people-outline" color={"#8A8A8A"} />
              <Text style={style.capacityText}>{pasengger}</Text>
            </Row>
            <Col>
              <Text>
                <Ionicons size={12} name="bag-outline" color={"#8A8A8A"} />
                <Text style={style.capacityText}> {baggage}</Text>
              </Text>
            </Col>
          </Row>
          <Text style={style.price}>{formatCurrency.format(price)}</Text>
        </Col>
      </Row>
    </Pressable>
  );
}

const style = StyleSheet.create({
  card: {
    borderColor: "rgba(0,0,0,0.5)",

    padding: 20,
    borderWidth: 0.5,
    borderRadius: 2,
    marginBottom: 20,
  },
  img: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  carName: {
    fontSize: 14,
  },
  capacityText: {
    color: "#8A8A8A",
  },
  price: {
    color: "#5CB85F",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: "2",
  },
});
