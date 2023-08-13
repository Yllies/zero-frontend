import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../reducers/favorites";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function ArticleDetails(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const favorites = useSelector((state) => state.favorites.value);
  const isFavorite = favorites.some((item) => item.idPost === props.idPost);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(props));
    } else {
      dispatch(addToFavorites(props));
    }
  };
  const goToDonnationScreen = (idPost) => {
    navigation.navigate("DonnationScreen", { idPost: idPost });
  };

  return (
    <View style={styles.containerPage}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          goToDonnationScreen(props.idPost);
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.donationImage}
            source={{ uri: props.photo }}
            alt="don"
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={handleFavoriteClick}>
              <FontAwesome
                style={styles.heart}
                name="heart"
                size={20}
                color={isFavorite ? "#EDFC92" : "white"} // Change the color based on the 'isFavorite' status
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.category}>{props.category}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    width: 160,
    height: 240,
    margin: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#274539",
    borderRadius: 4,
  },
  imageContainer: {
    height: 150, // Augmentez la hauteur de l'image
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderColor: "#EDFC92",
    overflow: "hidden",
  },
  contentContainer: {
    padding: 5, // Réduisez le padding
  },
  category: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    color: "#EDFC92",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 15,
    color: "#EDFC92",
  },
  description: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "white",
  },
  donationImage: {
    width: "100%",
    height: "100%",
  },
  touch: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: "#274539",
  },
});
