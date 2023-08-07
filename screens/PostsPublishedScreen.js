import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, logout } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function PostPublishedScreen() {
  // Récupérer les informations de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(true); // true pour déconnexion, false pour suppression de compte
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    console.log(user.token);

    fetch(`${BACK_URL}:3000/posts/company/published/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllPosts(data);
      });
  }, []);

  //   const handleDeletePost = () => {
  //     fetch(`${BACK_URL}:3000/posts/company/delete/${user.token}`);
  //   };

  const allPostsCompany = allPosts.data?.map((postCompany) => {
    return (
      <View style={styles.post}>
        <View style={styles.leftContain}>
          <Text style={styles.title}>{postCompany.title}</Text>
          <Text style={styles.description}>{postCompany.description}</Text>
        </View>
        <View style={styles.rightContain}>
          <TouchableOpacity>
            <FontAwesome
              style={styles.cross}
              name="close"
              size={20}
              color="white"
              onPress={() => handleDeletePost()}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.allPosts}>{allPostsCompany}</ScrollView>
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
    padding: 10,
  },
  post: {
    borderWidth: 2,
    height: 100,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#274539",
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
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#EDFC92",
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "white",
  },
});
