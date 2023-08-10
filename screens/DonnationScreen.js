import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import Swiper from 'react-native-swiper';

import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function DonnationScreen() {
  const user = useSelector((state) => state.user.value);
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState(null);
  const { idPost } = route.params;
  const [details, setDetails] = useState(null);
  const navigation = useNavigation();

  const goToProfileScreen = (author) => {
    navigation.navigate("DetailsAuthor", { author: author });
  };

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.post) {
          setDetails(data.post);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const companyUrl = `${BACK_URL}:3000/posts/company/${idPost}`;
    const charityUrl = `${BACK_URL}:3000/posts/charity/${idPost}`;

    fetchData(companyUrl);

    setTimeout(() => {
      if (!details) {
        fetchData(charityUrl);
      }
    }, 1000);

    setSelectedImage(details?.photo)
  }, [idPost, details]);
  
  const handleCancel = () => {
    fetch(
      `${BACK_URL}:3000/posts/association/book/cancel/${user.token}/${idPost}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
      )
      .then((response) => response.json())
      .then(() => {
        alert("Réservation annulée !");
      });
  };

  const handleReserve = () => {
    fetch(`${BACK_URL}:3000/posts/company/book/${user.token}/${idPost}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.json())
    .then(() => {
      alert(
        "Demande de réservation effectuée, veuillez patienter que l'entreprise confirme votre demande !"
        );
      });
    };
    
    
      return (
        <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.TopContainer}>
          <View style={styles.swiper}>

        {selectedImage?.length > 0 ? (
          <Swiper style={styles.wrapper} showsButtons={true}>
              {selectedImage.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                </View>
              ))}
            </Swiper>
          ) : (
            <Image
            source={require("../assets/asso6.jpeg")}
              style={styles.image}
              resizeMode="cover"
              />
              )}
              </View>


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
          <Text style={styles.title}>{details?.title}</Text>
          <View style={styles.InfosContainer}>
            <Text style={styles.titleInfo}>Catégorie:</Text>

            <Text style={styles.textInfo}>{details?.category}</Text>
            <Text style={styles.titleInfo}>Description:</Text>
            
            <Text style={styles.textInfo}>{details?.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnContact}
            onPress={() => {
              goToProfileScreen(details?.author?.token);
            }}
          >
            <Text style={styles.Contact}>
              Détails de l'{details?.author?.type}{" "}
              <FontAwesome
                name="arrow-right"
                color="#274539"
                size={30}
                style={styles.icons}
              />
            </Text>
          </TouchableOpacity>
          {user.type === "Association" && (
            <>
              <TouchableOpacity onPress={() => handleReserve()}>
                <Text>Envoyer une demande de réservation</Text>
              </TouchableOpacity>
              {details?.isBookedBy?.token === user.token && (
                <TouchableOpacity onPress={() => handleCancel()}>
                  <Text>Annuler ma réservation</Text>
                </TouchableOpacity>
              )}
            </>
          )}
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
    height: '100%',
    width: '100%',
    borderRadius: 15,
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
    justifyContent: "flex-start", 
    alignItems: "flex-start",
    marginTop: 250,
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  swiper:{
    height:250,
    width:250,
  }
});
