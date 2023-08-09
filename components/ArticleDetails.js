import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ArticleDetails(props) {
  const navigation =useNavigation()
  const goToDonnationScreen = (idPost) => {
    navigation.navigate("DonnationScreen", { idPost: idPost });
  };
  return (
    <View style={styles.containerPage}>
      <TouchableOpacity style={styles.touch}
        onPress={() => {
          goToDonnationScreen(props.idPost);
        }}
      >
        <Image
          style={styles.donationImage}
          source={{uri:props.photo}}
          alt="don"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          
          <Text style={styles.title}>{props.title}</Text>
          <TouchableOpacity>
            <FontAwesome
              style={styles.heart}
              name="heart"
              size={20}
              color="#274539"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.category}>{props.category}</Text>
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
  category:{
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    marginLeft: 10,
  },

  title: {
    flex: 1,
    fontFamily: "PoppinsBold",
    fontSize: 15,
    marginLeft: 10,
    color:"#274539",
  },
  description: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginLeft: 10,
  color:"#274539",
  },
  donationImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderColor:"#274539",
 
  },
  touch: {
    backgroundColor: "#EDFC92",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor:"#274539",
    borderWidth:2,
   
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
