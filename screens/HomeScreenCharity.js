import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";

import ArticleDetails from "../components/ArticleDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterScreen from "./FilterScreen";

const Stack = createNativeStackNavigator();
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

import { useSelector } from 'react-redux';


export default function HomeScreenCharity({ navigation }) {
  
  
  const selectedQuantity = useSelector(state => state.filter.quantity);

  const selectedDate= useSelector(state => state.filter.date);

  // const selectedLocalisation= useSelector(state => state.filter.localisation);
  
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appeler la fonction pour récupérer les posts depuis le backend ou une API REST
    fetchPosts();
  }, [selectedQuantity]);

  // Fonction pour récupérer les posts depuis le backend ou une API REST
  const fetchPosts = () => {

    console.log("selectedQuantity:", selectedQuantity); 
    // console.log("selectedDate:", selectedDate); 

    fetch(`${BACK_URL}:3000/posts/company`)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {

        const filteredPosts = data.posts.filter(post => {
    
          const quantityMatch = selectedQuantity.length === 0 || selectedQuantity.includes(post.quantity);
          const dateMatch = selectedDate === null || post.availability_date >= selectedDate;
          // const localisationMatch = selectedLocalisation.length === 0 || selectedLocalisation.includes(post.location);

          // Return true if the post passes all the filters, otherwise return false

              console.log("dateMatch:", dateMatch); 
              console.log("quantityMatch:", quantityMatch); 
    // console.log("selectedDate:", selectedDate); 

          return quantityMatch 
          && dateMatch 
          // && localisationMatch;

        });

        setPosts(filteredPosts);
          // setPosts(data.posts);

        } else {
          setError("Erreur inconnue !");
        }
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des posts :" + error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.scrollViewContainer}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.cardsRow}
          renderItem={({ item }) => (
            <View style={styles.needContainer}>
              <ArticleDetails
                title={item.title}
                description={item.description.slice(0, 25) + "..."}
                category={item.category}
                photo={item.photo[0]}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
 
  },
  scrollViewContainer: {
    flex: 1,
    width: "100%",
    marginTop:20,
  },
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  titre: {
    fontSize: 10,
    color: "white",
  },
});
