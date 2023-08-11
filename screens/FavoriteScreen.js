import React from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ArticleDetails from "../components/ArticleDetails";

export default function FavoriteScreen({ navigation }) {
  const favorites = useSelector((state) => state.favorites.value);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            Voici la liste de vos <Text style={styles.zero}>favoris</Text>
          </Text>
        </View>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idPost.toString()}
          renderItem={({ item }) => <View><ArticleDetails {...item} /></View>}
          contentContainerStyle={styles.cardsRow}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "columns",
  },
  topContainer: {
    backgroundColor: "#274539",
    width: "100%",
    height: 160,
    paddingTop: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: "MontserratBold",
    color: "white",
    textAlign: "center",
  },

  login: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  zero: {
    color: "#EDFC92",
  },
});
