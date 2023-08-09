import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useRoute } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux/es/hooks/useSelector";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

const DonnationScreen = () => {
  const route = useRoute();
  const { postId } = route.params;
  const [Details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`${BACK_URL}:3000/posts/company/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetails(data); // Update the Details state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }, [postId]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.TopContainer}>
          <Image
            source={require("../assets/asso6.jpeg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                name="heart"
                color="#EDFC92"
                size={40}
                style={styles.icons}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Détails</Text>
          <View style={styles.InfosContainer}>
            <Text style={styles.titleInfo}>Adresse de l'entreprise:</Text>
            <Text style={styles.textInfo}>
              12 rue de la République 13002 Marseille
            </Text>
            <Text style={styles.titleInfo}>Adresse de l'entreprise:</Text>
            <Text style={styles.textInfo}>
              12 rue de la République 13002 Marseille
            </Text>
          </View>
          <TouchableOpacity style={styles.btnContact}>
            <Text style={styles.Contact}>
              Détails de l'Entreprise{" "}
              <FontAwesome
                name="arrow-right"
                color="#274539"
                size={30}
                style={styles.icons}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    // borderRadius: 0 0 30 0
    height: 250,
    width: 250,
    borderBottomRightRadius: 30,
  },
  TopContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  iconContainer: {
    // flexDirection: "column",
    position: "absolute",
    top: 20,
    right: 20,
  },

  buttonContainer: {
    marginTop: 250,
    // Ajustez la marge supérieure en fonction de la disposition souhaitée
  },
  title: {
    color: "black",
  },
  button: {
    backgroundColor: "#EDFC92",
    padding: 10,
    width: 290,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  botcontiner: {
    justifyContent: "flex-start", // Updated from 'center' to 'flex-start'
    alignItems: "flex-start", // Updated from 'center' to 'flex-start'
    marginTop: 250, // You can adjust the marginTop as needed
  },
  icons: {
    marginTop: 50,
    marginBottom: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: "flex-start",
    paddingLeft: 30,
    paddingRight: 30,
    fontFamily: "Poppins",
  },
  title: {
    fontSize: 25,
    lineHeight: 54.5 /* 218% */,
    fontFamily: "PoppinsBold",
  },
  description: {
    color: 676767,
    fontFamily: "Poppins",
    fontSize: 15,
  },
  map: {
    height: 120,
    width: 240,
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  InfosContainer: {
    borderRadius: 10,
    backgroundColor: "#254739",
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  textInfo: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: "Poppins",
  },
  titleInfo: {
    fontSize: 15,
    lineHeight: 54.5,
    color: "white",
    fontFamily: "Poppins",
  },
  PFContainer: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#EDFC92",
    paddingLeft: 40,
    paddingTop: 20,
  },
  PFText: {
    color: "#274539",
    fontSize: 15,
    fontFamily: "Poppins",
  },
  Number: {
    color: "#274539",
    fontSize: 105.799,
    marginTop: -75,
    fontFamily: "Poppins",
  },
  btnContact: {
    backgroundColor: "#EDFC92",
    padding: 10,
    width: 290,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 25,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  Contact: {
    fontSize: 17,
    color: "#274539",
    marginBottom: 10,
    fontFamily: "Poppins",
  },
});

export default DonnationScreen;
