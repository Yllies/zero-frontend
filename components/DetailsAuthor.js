import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import MapScreen from "../components/Map";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

const DetailsAuthor = () => {
  const route = useRoute();
  const { author } = route.params;
  const [details, setDetails] = useState(null);
  const navigation = useNavigation();
  console.log(author);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      fetch(`${BACK_URL}:3000/users/${author}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDetails(data); // Update the Details state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching post details:", error);
        });
    }, 1000);
  }, [author]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
            <TouchableOpacity>
              <FontAwesome
                name="star"
                color="#254739"
                size={40}
                style={styles.icons}
              />
            </TouchableOpacity>
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
          <Text style={styles.title}>Qui sommes-nous?</Text>
          <Text style={styles.description}>{details?.description}</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapScreen />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Infos Complémentaire</Text>
          <View style={styles.InfosContainer}>
            <Text style={styles.titleInfo}>
              {" "}
              <FontAwesome
                name="map-pin"
                color="#EDFC92"
                size={40}
                style={styles.icons}
              />{" "}
              Adresse
            </Text>
            <Text style={styles.textInfo}>{details?.address}</Text>

            <Text style={styles.titleInfo}>
              {" "}
              <FontAwesome
                name="lock"
                color="#EDFC92"
                size={40}
                style={styles.icons}
              />{" "}
              Horaires
            </Text>
            <Text style={styles.textInfo}>
              Du lundi au vendredi de 9h à 18h
            </Text>
          </View>
          <Text style={styles.title}>Points Forts</Text>
          <View style={styles.PFContainer}>
            <Text style={styles.Number}>
              8 <Text style={styles.PFText}>euros dans la poche</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.btnContact} onPress={toggleModal}>
            <Text style={styles.Contact}>
              Contacter l'{details?.type}{" "}
              <FontAwesome
                name="arrow-right"
                color="#EDFC92"
                size={30}
                style={styles.icons}
              />
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <FontAwesome
                  name="close"
                  color="black"
                  size={30}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Contact Details</Text>
                <Text>Email: {details?.email}</Text>
                <Text>Telephone: {details?.phone_number}</Text>
              </View>
            </View>
          </Modal>
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
    height: 320,
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
    marginBottom: 10,
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
    fontSize: 25,
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
    backgroundColor: "#274539",
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
    color: "white",
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default DetailsAuthor;
