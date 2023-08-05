import React from "react";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function NeedDetails(props) {
  console.log(props);
  return (
    <View style={styles.containerPage}>
      <TouchableOpacity style={styles.touch}>
      <Image
          style={styles.donationImage}
          source={require("../assets/background-diagonal.png")} //{/*{{uri: props.photo }}*/} // Utilisation de l'URL directement
          alt="don"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Text style={styles.title}>
             {props.title}
          </Text>
          <TouchableOpacity>
            <FontAwesome
              style={styles.heart}
              name="heart"
              size={20}
              color="#274539"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          {props.description}
        </Text>
        <Text style={styles.category}>
          {props.category}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    width: 160,
    margin: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  title: {
    flex: 1,
    fontFamily: "PoppinsBold",
    fontSize: 15,
    marginLeft: 10,
  },
  description: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginLeft: 10,
  },

  touch: {
    backgroundColor: "#EDFC92",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  donationImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
