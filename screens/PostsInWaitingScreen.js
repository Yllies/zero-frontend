import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addToConfirm,
  addToUpdate,
  removeAllToConfirm,
  addToConfirmOrRefuse,
} from "../reducers/post";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function PostsInWaitingScreen() {
  // Récupérer les informations de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user.value);
  const post = useSelector((state) => state.post.value.toConfirm);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [allPosts, setAllPosts] = useState([]);
  const [lastDeleted, setLastDeleted] = useState("");

  const handleConsult = (post) => {
    dispatch(addToConfirmOrRefuse(post));
    navigation.navigate("Reservation");
  };

  const allPostsInWaiting = post.map((postInWaiting, i) => {
    return (
      <TouchableOpacity key={i}>
        <View style={styles.post}>
          <View style={styles.leftContain}>
            <Text style={styles.title}>{postInWaiting.title}</Text>
            <Text style={styles.description}>{postInWaiting.description}</Text>
            <Text style={styles.category}>{postInWaiting.category}</Text>
          </View>
          <View style={styles.rightContain}>
            <TouchableOpacity
              onPress={() => handleConsult(postInWaiting)}
              style={styles.btnAccept}
            >
              <Text style={styles.accepter}>Consulter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  console.log(allPostsInWaiting);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleHeader}>
          En attente de <Text style={{ color: "#EDFC92" }}>confirmation</Text>
        </Text>
      </View>
      <ScrollView style={styles.allPosts}>{allPostsInWaiting}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  allPosts: {
    width: "90%",
    // padding: 10,
    paddingTop: "5%",
  },

  post: {
    height: 140,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#274539",
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  leftContain: {
    width: "60%",
    padding: 10,
  },
  rightContain: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50,
    height: "100%",
    flexDirection: "column",
  },
  title: {
    fontSize: 15,
    fontFamily: "PoppinsBold",
    color: "#EDFC92",
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "white",
  },
  category: {
    fontSize: 12,
    fontFamily: "PoppinsSemiBold",
    color: "#EDFC92",
  },
  topContainer: {
    backgroundColor: "#274539",
    width: "100%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // marginBottom: 10,
  },
  titleHeader: {
    fontFamily: "MontserratBold",
    color: "white",
    fontSize: 30,
  },
  btnAccept: {
    padding: 7,
    width: "80%",
    backgroundColor: "#EDFC92",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 4,
  },
  btnRefuse: {
    padding: 7,
    width: "80%",
    backgroundColor: "#EDFC92",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 4,
  },
  accepter: {
    fontFamily: "PoppinsSemiBold",
    color: "#274539",
    textAlign: "center",
    // backgroundColor: "#EDFC92",
  },
  refuser: {
    fontFamily: "PoppinsSemiBold",
    color: "#274539",
    textAlign: "center",
  },
});
