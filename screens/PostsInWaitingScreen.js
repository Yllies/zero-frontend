import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, logout } from "../reducers/user";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../components/Header";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addToUpdate } from "../reducers/post";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function PostsInWaitingScreen() {
  // Récupérer les informations de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user.value);
  const post = useSelector((state) => state.post.value.toConfirm);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [allPosts, setAllPosts] = useState([]);
  const [lastDeleted, setLastDeleted] = useState("");

  const allPostsInWaiting = post.map((postInWaiting, i) => {
    return (
      <TouchableOpacity key={i}>
        <View style={styles.post}>
          <View style={styles.leftContain}>
            <Text style={styles.title}>{postInWaiting.title}</Text>
            <Text style={styles.description}>{postInWaiting.description}</Text>
          </View>
          <View style={styles.rightContain}>
            <FontAwesome
              style={styles.cross}
              name="close"
              size={20}
              color="#274539"
              onPress={() => handleDeletePost(postInWaiting.idPost)}
            />
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
    backgroundColor: "#F6F8F7",
    justifyContent: "center",
    alignItems: "center",
  },
  allPosts: {
    width: "90%",
    // padding: 10,
  },
  post: {
    height: 100,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#EDFC92",
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: "#274539",
    borderWidth: 2,
  },
  leftContain: {
    width: "80%",
    padding: 10,
  },
  rightContain: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    color: "#274539",
  },
  description: {
    fontSize: 15,
    fontFamily: "Poppins",
    color: "#274539",
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
    fontSize: 25,
  },
});
