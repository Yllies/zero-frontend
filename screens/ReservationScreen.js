import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleReserved from "../components/ArticleReserved";
import ConfettiCannon from "react-native-confetti-cannon";
import { useIsFocused } from "@react-navigation/native";
import {  addToShowTheAccepted } from "../reducers/post";
import { removeAllToConfirm } from "../reducers/post";
import {
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function ReservationScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const post = useSelector((state) => state.post.value.toConfirmOrRefuse);
  const postAccepted = useSelector((state) => state.post.value.reserved);

  const [isReserved, setIsReserved] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log("annonce à confirmer", post);
  }, [isFocused]);

  const setReservedFalse = () => {
    setIsReserved(false);
  };

  const handleAccept = (post) => {
    fetch(
      `${BACK_URL}:3000/posts/company/book/accept/${user.token}/${post.idPost}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(removeAllToConfirm());
        dispatch(addToShowTheAccepted(data));
        setIsReserved(true);

        console.log("Réservation acceptée", isReserved);
      });
  };
  const handleRefuse = (post) => {
    fetch(
      `${BACK_URL}:3000/posts/company/book/refuse/${user.token}/${post.idPost}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then(() => {
        dispatch(removeAllToConfirm());
        alert("Réservation refusée");
        navigation.navigate("Acount");
        console.log("Réservation refusée ", isReserved);
      });
  };
  return !isReserved ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        style={styles.greenBackground}
        source={require("../assets/background-diagonal.png")}
      >
        <View>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "MontserratBold",
                color: "white",
              }}
            >
              Votre{" "}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "MontserratBold",
                color: "#EDFC92",
              }}
            >
              réservation
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.statutReservation}>
              En attente de validation
            </Text>
            <View style={styles.reservationContainer}>
              <View style={styles.containerPage}>
                <TouchableOpacity style={styles.touch}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.donationImage}
                      source={{ uri: post.photo[0] }}
                      alt="don"
                    />
                  </View>
                  <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.titleCard}>{post.title}</Text>
                    </View>

                    <Text style={styles.description}>{post.description}</Text>
                    <Text style={styles.category}>{post.category}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.attention}>
                Attention, plus que 24h pour valider la demande de réservation !
              </Text>
              <TouchableOpacity
                onPress={() => handleAccept(post)}
                style={styles.btnAccept}
              >
                <Text style={styles.valider}>VALIDER</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleRefuse(post)}
                style={styles.btnRefuse}
              >
                <Text style={styles.refuser}>REFUSER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAvoidingView style={styles.reservationDone}>
      <ConfettiCannon fadeOut="true" count={400} origin={{ x: 0, y: 0 }} />

      <ArticleReserved resetTheReserve={setReservedFalse} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greenBackground: {
    height: "102%",
    width: "100%",
  },
  title: {
    flexDirection: "row",
    padding: 40,
    width: "100%",
    marginTop: 30,
  },
  middleContainer: {
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
  reservationContainer: {
    marginTop: 60,
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
  statutReservation: {
    fontFamily: "MontserratBold",
    fontSize: 28,
    color: "white",
    width: 330,
    textAlign: "center",
  },
  btnAccept: {
    backgroundColor: "#274539",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
    margin: 10,
  },
  btnRefuse: {
    backgroundColor: "red",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
    margin: 10,
  },
  valider: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
    padding: 10,
    width: 280,
    textAlign: "center",
  },
  refuser: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
    padding: 10,
    width: 280,
    textAlign: "center",
  },
  attention: {
    marginTop: 15,
    textAlign: "center",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    color: "#274539",
    width: 300,
    marginBottom: 40,
  },
  reservationDone: {
    // borderWidth: 4,
    flex: 1,
    padding: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  containerPage: {
    width: 160,
    height: 240,
    margin: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#274539",
    borderRadius: 4,
  },
  imageContainer: {
    height: 150, // Augmentez la hauteur de l'image
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderColor: "#EDFC92",
    overflow: "hidden",
  },
  contentContainer: {
    padding: 5, // Réduisez le padding
  },
  category: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    color: "#EDFC92",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleCard: {
    fontFamily: "PoppinsBold",
    fontSize: 15,
    color: "#EDFC92",
  },
  description: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "white",
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
