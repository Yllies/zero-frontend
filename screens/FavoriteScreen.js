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
          Vos <Text style={styles.zero}>favoris</Text>
        </Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idPost.toString()}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <ArticleDetails {...item} />
          </View>
        )}
        contentContainerStyle={styles.cardsRow}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  zero: {
    color: "#EDFC92",
  },
  cardsRow: {
    justifyContent: "space-between", // Ajoutez de l'espace entre les colonnes
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 16,
  },

  articleContainer: {
    width: "48%", // Chaque article prend la moitié de la ligne avec un espace entre eux
    marginBottom: 10,
  },
});
