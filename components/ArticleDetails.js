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
          source={require("../assets/asso1.jpeg")} //{/*{{uri: props.photo }}*/} // Utilisation de l'URL directement
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
            Don {/*{props.title}substring(0,25) + "..."*/}
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
          Donne vêtements invendables mais ...
          {/*{props.description}*/}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    width: 160,
    margin: 7,
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
  donationImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  touch: {
    backgroundColor: "#EDFC92",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
