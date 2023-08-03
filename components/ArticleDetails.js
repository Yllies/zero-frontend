import React from "react";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ArticleDetails(props) {
  console.log(props.photo);
  return (
    <View style={styles.containerPage}>
      <TouchableOpacity style={styles.touch}>
        <Image
          style={styles.donationImage}
          source={{ uri: props.photo }} // Utilisation de l'URL directement
          alt="don"
        />
        <Text
          style={{
            fontFamily: "MontserratBold",
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          {props.title}
        </Text>
        <Text style={{ fontFamily: "Poppins", fontSize: 12, marginLeft: 10 }}>
          {props.description}
        <TouchableOpacity style={styles.heartIcon}>
          <FontAwesome name="heart" size={20} color="#274539" />
        </TouchableOpacity>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    height: 200,
    backgroundColor: "#EDFC92",
    borderRadius: 5,
    width: 160,
    margin: 10,
  },

  donationImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 15,
  },
  heartIcon: {
    paddingLeft: 120,
   
   
  },
// touch:{
//   // marginTop: -218,
//   // marginRight:40,
//   // paddingBottom: 30,
//   justifyContent: "left",
//   alignItems: "left",
//   // paddingLeft: 300,
// }
});
