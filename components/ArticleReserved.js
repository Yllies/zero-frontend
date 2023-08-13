import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ArticleReserved({ resetTheReserve }) {
  const user = useSelector((state) => state.user.value);
  const post = useSelector((state) => state.post.value.toConfirmOrRefuse);
  const postAccepted = useSelector((state) => state.post.value.reserved);
  const { name, description } = postAccepted.dataPopulate.isBookedBy;
  const navigation = useNavigation();

  const handleBack = () => {
    resetTheReserve();
    navigation.navigate("Acount");
  };
  return (
    <View style={styles.reservationContainer}>
      <Text
        style={{
          fontFamily: "MontserratBold",
          fontSize: 25,
        }}
      >
        Félicitations, votre don est réservé par {name}
      </Text>
      <View style={styles.card}>
        <Image style={styles.img} source={require("../assets/asso4.jpeg")} />
        <View>
          <Text style={styles.descriptionAssociation}>
            {description
              ? description
              : "Aucun description renseignée par l'entreprise"}
          </Text>
          <View style={styles.note}>
            <FontAwesome name="star" size={25} style={styles.star} />
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 20,
                color: "white",
                justifyContent: "center",
              }}
            >
              {"  "}
              4,9/5
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btnContact}>
        <Text style={styles.contact}>CONTACTER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContact} onPress={() => handleBack()}>
        <Text style={styles.contact}>RETOUR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reservationContainer: {
    height: 400,
    width: 350,
  },
  card: {
    marginTop: 30,
    flexDirection: "row",
    backgroundColor: "#274539",
    borderRadius: 5,
  },
  img: {
    resizeMode: "cover",
    width: 143,
    height: 206,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  descriptionAssociation: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "white",
    width: 250,
    padding: 20,
  },
  note: {
    flexDirection: "row",
    padding: 16,
  },
  star: {
    color: "#fbff00",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnContact: {
    padding: 5,
    marginTop: 23,
    backgroundColor: "#EDFC92",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 5,
  },
  contact: {
    fontSize: 22,
    color: "#274539",
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
});
