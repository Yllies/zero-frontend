import React from "react";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function ArticleDetails() {
  return (
    <View style={styles.containerPage}>
      <TouchableOpacity style={styles.touch}>
        <Image
          style={styles.donationImage}
          source={require("../assets/don.png")}
          alt="don"
        />
        <Text style={styles.don}>CHAUSSURES</Text>
        <Text style={styles.don}>10 paires</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: "#274539",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 300,
  
  },

  don: {
    fontSize: 15,
    paddingLeft:10,
    fontFamily: "Poppins",
    color: "#EDFC92",

  },
  donationImage: {
    width: 200,
    height: 130, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 25, 
  },
});
