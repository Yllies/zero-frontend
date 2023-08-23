import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import correct
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
import { useRoute, useNavigation } from "@react-navigation/native"; // Combine imports

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function DonnationScreen() {
  const user = useSelector((state) => state.user.value);
  const route = useRoute();
  const { idPost } = route.params;
  const [details, setDetails] = useState(null);
  const navigation = useNavigation();

  const goToProfileScreen = (author) => {
    navigation.navigate("DetailsAuthor", { author: author });
  };
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    console.log("on joue le useEffect", user.token, details);
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.post) {
          setDetails(data.post);
          console.log("on a set le detail");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    const companyUrl = `${BACK_URL}/posts/company/${idPost}`;
    const charityUrl = `${BACK_URL}/posts/charity/${idPost}`;
    fetchData(companyUrl); // Try fetching from the company URL
    if (!details) {
      console.log("fetch charity");
      fetchData(charityUrl); // If details are still null, fetch from the charity URL
    }
  }, [idPost, isReserved, details]);

  useEffect(() => {
    console.log("le use qui set le reserved");
    if (details?.isBooked === "Oui" || details?.isBooked === "En attente") {
      setIsReserved(true);
      console.log("true", isReserved);
    } else if (details?.isBooked === "Non") {
      setIsReserved(false);
      console.log("false", isReserved);
    }
  }, [details]);

  const handleCancel = () => {
    fetch(
      `${BACK_URL}/posts/charity/book/cancel/${user.token}/${details.idPost}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then(() => {
        setIsReserved(false);
        alert("Réservation annulée !");
      });
  };

  const handleReserve = () => {
    fetch(
      `${BACK_URL}/posts/charity/book/${user.token}/${details.idPost}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then(() => {
        setIsReserved(true);
        alert(
          "Demande de réservation effectuée, veuillez patienter que l'entreprise confirme votre demande !"
        );
      });
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
              <View style={styles.circle}>
                <FontAwesome
                  name="heart"
                  color="#EDFC92"
                  size={40}
                  style={styles.icons}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.circle}>
                <FontAwesome
                  name="star"
                  color="#274539"
                  size={40}
                  style={styles.icons}
                />
              </View>
            </TouchableOpacity>
            <Text> 4,9</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{details?.title}</Text>
          <View style={styles.InfosContainer}>
            <Text style={styles.titleInfo}>Catégorie :</Text>

            <Text style={styles.textInfo}>{details?.category}</Text>
            <Text style={styles.titleInfo}>Description :</Text>

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
                size={15}
                style={styles.icons}
              />
            </Text>
          </TouchableOpacity>
          <View style={styles.btnBooking}>
            {user.type === "Association" &&
              !isReserved &&
              details?.isBooked === "Non" && (
                <TouchableOpacity
                  style={styles.reserve}
                  onPress={() => handleReserve()}
                >
                  <Text style={styles.reserver}>
                    Envoyer une demande de réservation
                  </Text>
                </TouchableOpacity>
              )}

            {isReserved && details?.isBookedBy?.token === user.token && (
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => handleCancel()}
              >
                <Text style={styles.annuler}>Annuler ma réservation</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* {user.type === "Association" &&
            !details.isReserved &&
            details.isBooked === "Non" && (
              <View style={styles.btnBooking}>
                <TouchableOpacity
                  style={styles.reserve}
                  onPress={() => handleReserve()}
                >
                  <Text style={styles.reserver}>
                    Envoyer une demande de réservation
                  </Text>
                </TouchableOpacity>
                {details?.isBookedBy?.token === user.token && (
                  <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => handleCancel()}
                  >
                    <Text style={styles.annuler}>Annuler ma réservation</Text>
                  </TouchableOpacity>
                )}
              </View>
            )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginRight: 15,
    justifyContent: "center",
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
    paddingTop: "10%",
    paddingBottom: "5%",
    fontSize: 25,
    fontFamily: "PoppinsBold",
    color: "#274539",
  },

  textInfo: {
    color: "white",
    fontSize: 13,
    fontFamily: "Poppins",
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
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },

  titleInfo: {
    fontSize: 15,
    lineHeight: 50,
    color: "white",
    fontFamily: "MontserratBold",
  },

  PFContainer: {
    borderRadius: 10,
    backgroundColor: "#EDFC92",
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
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center", // Centrer horizontalement
    marginBottom: 25,
    marginTop: 25,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center", // Centrer verticalement
  },

  Contact: {
    fontSize: 15,
    color: "#274539",
    fontFamily: "Poppins",
  },

  reserve: {
    backgroundColor: "#274539",
    padding: 10,
    borderRadius: 5,
    margin: 7,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  cancel: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  reserver: {
    fontFamily: "Poppins",
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },

  annuler: {
    fontFamily: "Poppins",
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
});
