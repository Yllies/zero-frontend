import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import ArticleDetails from "../components/ArticleDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function HomeScreen({ navigation }) {
  const articlesCards = [];

  for (let i = 0; i < 10; i++) {
    articlesCards.push(<ArticleDetails key={i} />);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />

        <View style={styles.cardsRow}>{articlesCards}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  containerFilter: {
    marginTop: -218,
    marginRight: 40,
    paddingBottom: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingLeft: 300,
  },

  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    flexWrap: "wrap",
    // paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },

  cardContainer: {
    width: "48%",
    marginBottom: 10,
  },

  containerArticle: {
    backgroundColor: "#274539",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  titre: {
    fontSize: 17,
    color: "white",
    marginBottom: 5,
  },

  paragraphe: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "white",
    marginBottom: -15,
  },

  infoContainer: {
    padding: 12,
  },

  donationImage: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  heartIcon: {
    paddingLeft: 130,
    paddingBottom: 1,
  },
  iconeFilter: {
    borderRadius: 400,
  },
});
