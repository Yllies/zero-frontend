import React from "react";
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
import { useSelector } from "react-redux";
import MapScreen from "../components/Map";
import { useState, useEffect} from "react";


const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function UserProfileScreen  ()  {
  const user = useSelector((state) => state.user.value);
    const author = user.token
    const [details, setDetails] = useState(null);
    const [initialRegion,setInitialRegion] = useState(null)
    const [count,setCount] =useState(0)
    const [text,setText] =useState('')
    useEffect(() => {
      setTimeout(() => {
        fetch(`${BACK_URL}:3000/users/${author}`)
          .then((response) => response.json())
          .then((data) => {
            setDetails(data);
            setInitialRegion({
              latitude: data.latitude,
              longitude: data.longitude,
              latitudeDelta: data.latitudeDelta,
              longitudeDelta: data.longitudeDelta,
            });
    
            if (data.type === 'Entreprise') {
              setText('dons ont été postés par cette entreprise');
      
              fetch(`${BACK_URL}:3000/posts/company/published/${author}`)
                .then((response) => response.json())
                .then((postData) => {
                  setCount(postData.data.length);
                })
                .catch((error) => {
                  console.error("Error fetching company posts:", error);
                });
            } else if (data.type === 'Association') {
              setText('besoins ont été postés par cette association');
      
              fetch(`${BACK_URL}:3000/posts/charity/published/${author}`)
                .then((response) => response.json())
                .then((postData) => {
                  setCount(postData.data.length);
                })
                .catch((error) => {
                  console.error("Error fetching association posts:", error);
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      }, 1000);
    }, []);

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
          <Text style={styles.description}>
{details?.description}
          </Text>
        </View>
        <View style={styles.mapContainer}>
        <MapScreen initialRegion = {initialRegion} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Infos Complémentaire</Text>
          <View style={styles.InfosContainer}>
            <Text style={styles.titleInfo}>
              {" "}
              <FontAwesome
                name="map-pin"
                color="#EDFC92"
                size={20}
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
                size={30}
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
              {count} <Text style={styles.PFText}> {text}</Text>
            </Text>
          </View>
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
    // marginTop: 250,
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
    fontSize: 20,
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
    fontSize: 12,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: "Poppins",
  },
  titleInfo: {
    fontSize: 17,
    lineHeight: 54.5,
    color: "white",
    fontFamily: "Poppins",
  },
  PFContainer: {
    marginTop: 20,
    marginBottom:30,
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
});


