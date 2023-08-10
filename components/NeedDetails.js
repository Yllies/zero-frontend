import React from "react";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function NeedDetails(props) {

  let ImageCompany;


  switch (props.category) {
    case "Meubles":
      ImageCompany = require('../assets/meuble.webp');
      break;
      case "High-Tech":
        ImageCompany = require('../assets/itech.webp');
        break;
      case "Electroménager":
        ImageCompany = require('../assets/electro.jpeg');
        break;
      case "Jeux":
        ImageCompany = require('../assets/enfants.webp');
        break;
      case "Enfants":
        ImageCompany = require('../assets/enfants.webp');
        break;
      case "Autre":
        ImageCompany = require('../assets/autre.webp');
        break;
        case "Vetement":
          ImageCompany = require('../assets/clothes.jpeg');
          break;

  }

  const navigation = useNavigation()
  const goToDonnationScreen = (idPost) => {
    console.log("toto", idPost),
   navigation.navigate("DonnationScreen", { idPost: idPost });
 };
  return (
    <View style={styles.containerPage}>
           <TouchableOpacity style={styles.touch}
        onPress={() => {
          goToDonnationScreen(props.idPost);
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.donationImage}
            source={ImageCompany} 
            alt="don"
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity>
              <FontAwesome
                style={styles.heart}
                name="heart"
                size={20}
                color="#EDFC92"
              />
            </TouchableOpacity>
          </View>
         
          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.category}>{props.category}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    width: 160,
    height: 250, // Ajustez cette hauteur pour contrôler la taille des éléments
    margin: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor:"#EDFC92",
    borderWidth: 2,
        backgroundColor:"#274539",
  },
  imageContainer: {
    height: 150,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderColor: "#EDFC92",
    overflow: "hidden",
  },
  contentContainer: {
    padding: 10,
  },
  category: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    color: "#EDFC92"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 15,
    color: "#EDFC92"
  },
  description: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "white"
  },
  donationImage: {
    width: "100%",
    height: "100%",
  },
  touch: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: "#274539",
  
  },
});
