// Import des dépendances et composants nécessaires
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../reducers/favorites";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

// Composant fonctionnel pour afficher les détails d'un article
export default function ArticleDetails(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Récupération des articles favoris depuis le store Redux
  const favorites = useSelector((state) => state.favorites.value);
  // Vérification si l'article actuel est dans la liste des favoris
  const isFavorite = favorites.some((item) => item.idPost === props.idPost);

  // Gestion du clic sur l'icône de favori
  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(props));
    } else {
      dispatch(addToFavorites(props));
    }
  };

  // Navigation vers l'écran de don avec l'ID de la publication
  const goToDonnationScreen = (idPost) => {
    navigation.navigate("DonnationScreen", { idPost: idPost });
  };

  // Rendu du composant
  return (
    <View style={styles.containerPage}>
      {/* Lien d'appel à l'écran de don avec ID de publication */}
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          goToDonnationScreen(props.idPost);
        }}
      >
        {/* Conteneur pour l'image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.donationImage}
            source={{ uri: props.photo }}
            alt="don"
          />
        </View>
        {/* Conteneur pour le contenu */}
        <View style={styles.contentContainer}>
          {/* Conteneur pour le titre et l'icône de favori */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
            {/* Icône de favori */}
            <TouchableOpacity onPress={handleFavoriteClick}>
              <FontAwesome
                style={styles.heart}
                name="heart"
                size={20}
                color={isFavorite ? "#EDFC92" : "white"} // Changer la couleur en fonction du statut 'isFavorite'
              />
            </TouchableOpacity>
          </View>

          {/* Description et catégorie de l'article */}
          <Text style={styles.description}>{props.description}</Text>
          <Text style={styles.category}>{props.category}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Styles du composant
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
    height: 150, // Augmenter la hauteur de l'image
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderColor: "#EDFC92",
    overflow: "hidden",
  },
  contentContainer: {
    padding: 5, // Réduire le padding
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
