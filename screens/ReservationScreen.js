import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import ReservationDone from "../components/ReservationDone";
import ArticleDetails from "../components/ArticleDetails";
import ArticleReserved from "../components/ArticleReserved";
import ConfettiCannon from "react-native-confetti-cannon";

import {
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function ReservationScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // if(LE POST EST EN ATTENTE DE CONFIRMATION){
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    //   <ImageBackground
    //     style={styles.greenBackground}
    //     source={require("../assets/background-diagonal.png")}
    //   >
    //     <View>
    //       <View style={styles.title}>
    //         <Text
    //           style={{
    //             fontSize: 20,
    //             fontFamily: "MontserratBold",
    //             color: "white",
    //           }}
    //         >
    //           Votre{" "}
    //         </Text>
    //         <Text
    //           style={{
    //             fontSize: 20,
    //             fontFamily: "MontserratBold",
    //             color: "#EDFC92",
    //           }}
    //         >
    //           réservation
    //         </Text>
    //       </View>
    //       <View style={styles.middleContainer}>
    //         <Text style={styles.statutReservation}>
    //           En attente de validation
    //         </Text>
    //         <View style={styles.reservationContainer}>
    //           <ArticleDetails />
    //           <Text style={styles.attention}>
    //             Attention, plus que 24h pour valider la demande de réservation !
    //           </Text>
    //           <TouchableOpacity style={styles.btn}>
    //             <Text style={styles.valider}>VALIDER</Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity style={styles.btn}>
    //             <Text style={styles.refuser}>REFUSER</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //     <StatusBar style="auto" />
    //   </ImageBackground>
    // </KeyboardAvoidingView>
    // }else{
    // SI LA RESERVATION A ETE CONFIRMé
    <KeyboardAvoidingView style={styles.reservationDone}>
      <ConfettiCannon fadeOut="true" count={400} origin={{ x: 0, y: 0 }} />

      <ArticleReserved/>
    </KeyboardAvoidingView>
    // }
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
  btn: {
    backgroundColor: "#274539",
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
    padding:20,

    alignItems: "center",
    justifyContent: "center",
  },
});
