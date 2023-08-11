import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, logout } from "../reducers/user";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";
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

export default function PostPublishedScreen() {
  // Récupérer les informations de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user.value);
  const post = useSelector((state) => state.post.value);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [allPosts, setAllPosts] = useState([]);
  const [lastDeleted, setLastDeleted] = useState("");
  useEffect(() => {
    console.log("retour dans le composant post published");
    fetch(`${BACK_URL}:3000/posts/company/published/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data.data);
      });
  }, [isFocused, lastDeleted]);

  const handleDeletePost = (id) => {
    fetch(`${BACK_URL}:3000/posts/company/delete/${user.token}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setLastDeleted(id);
          // alert("Post supprimé");
        }
      });
  };

  const handleUpdatePost = (post) => {
    dispatch(addToUpdate(post));
    navigation.navigate("EditPost");
  };

  const allPostsCompany = allPosts?.map((postCompany, i) => {
    return (
      <TouchableOpacity key={i}>
        <View style={styles.post}>
          <View style={styles.leftContain}>
    
            <Text style={styles.title}>{postCompany.title}</Text>
            <Text style={styles.description}>{postCompany.description.slice(0, 25) + "..."}</Text>
            <Text style={styles.category}>{postCompany.category}</Text>
          </View>
          <View style={styles.rightContain}>
            <FontAwesome
              style={styles.cross}
              name="close"
              size={20}
              color="white"
              onPress={() => handleDeletePost(postCompany.idPost)}
            />
            <TouchableOpacity onPress={() => handleUpdatePost(postCompany)}>
              <FontAwesome name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleHeader}>
          Annonces <Text style={{ color: "#EDFC92" }}>publiées</Text>
        </Text>
      </View>
      <ScrollView style={styles.allPosts}>{allPostsCompany}</ScrollView>
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
  },
  post: {
    // height: 100,
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
    fontSize:15,
    fontFamily: "PoppinsBold",
    color: "#EDFC92"
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "white"
  },
 category: {
    fontSize: 12,
    fontFamily: "PoppinsBold",
    color:"#EDFC92"
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
});
