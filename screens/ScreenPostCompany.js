import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function AddScreenCompany({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    // Vérifier et demander la permission d'accéder à la galerie
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  // Fonction pour sélectionner des images depuis la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [3, 4],
      quality: 1,
      allowsMultipleSelection: true,
    });

    // Vérifier si l'utilisateur a sélectionné des images
    if (!result.cancelled) {
      // Ajouter les nouvelles images sélectionnées au tableau existant
      setSelectedImages([...selectedImages, ...result.assets]);
    }
  };

  // Fonction pour ouvrir l'appareil photo
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [3, 4],
      quality: 1,
    });

    // Vérifier si l'utilisateur a pris une photo
    if (!result.cancelled) {
      // Ajouter la nouvelle image prise au tableau existant
      setSelectedImages([...selectedImages, result]);
    }
  };

  // Fonction pour supprimer une image du tableau selectedImages
  const removeImage = (imageUri) => {
    setSelectedImages(selectedImages.filter((image) => image.uri !== imageUri));
  };

  // Si l'accès à la galerie est refusé, afficher un message d'erreur
  if (galleryPermission === false) {
    return <Text>Pas d'accès au stockage interne</Text>;
  }
  const onDayPress = (day) => {
    console.log(day)
    setSelectedDate(day.dateString);
    setAvailability(day.dateString);
  };
  // Composant pour afficher une image sélectionnée avec l'icône de suppression
  const SelectedImageItem = ({ item }) => (
    <View style={styles.selectedImageItem}>
      <Image source={{ uri: item.uri }} style={styles.selectedImage} />
      {/* Icône "times" pour supprimer l'image */}
      <TouchableOpacity
        onPress={() => removeImage(item.uri)}
        style={styles.deleteIconContainer}
      >
        <FontAwesome
          name="times"
          size={20}
          color="#EDFC92"
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = () => {
    console.log("lavalabiliaty", availability)
    if (!title || !description || !category || !selectedImages || !quantity || !availability) {
      // Vérifier si tous les champs obligatoires sont remplis
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Créer un tableau contenant les liens des images sélectionnées
    const picture = selectedImages.map((image) => image.uri);
    
    // Créer un objet contenant les informations de l'annonce
    const newPostData = {
      title,
      description,
      category,
      photo: picture,
      quantity,
      availability_date: availability,
    };
    console.log("from front", user.token)

    // Envoyer les informations au backend via une requête POST
    fetch(`${BACK_URL}:3000/posts/company/publish/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Si la publication a réussi, naviguer vers une autre page ou afficher un message de succès
          // Naviguer vers une autre page :
          // Ou afficher un message de succès :
          alert("Votre annonce a été publiée avec succès !");
          // Réinitialiser les champs du formulaire (si nécessaire)
          setTitle("");
          setDescription("");
          setCategory("");
          setQuantity("");
          setAvailability("");
          setSelectedImages([]);
          navigation.navigate("Accueil"); 
        } else {
          // Si la publication a échoué, afficher un message d'erreur
          alert("Une erreur est survenue lors de la publication de l'annonce.");
        }
      })
      .catch((error) => {
        // Gérer les erreurs potentielles
        console.error("Erreur lors de la publication de l'annonce :", error);
        // Afficher un message d'erreur générique
        alert("Une erreur est survenue lors de la publication de l'annonce.");
      });
  };
  const customTheme = {
    todayTextColor: '#EDFC92', 
    arrowColor: '#EDFC92', 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            Postez votre <Text style={styles.zero}>annonce</Text>
          </Text>
        </View>
        <ScrollView style={styles.bottomContainer}>
          <View style={styles.form}>
            {/* Champ pour le titre */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value) => setTitle(value)}
                value={title}
                placeholder="Quel est le titre de votre annonce?"
              />
            </View>
            {/* Champ pour la catégorie */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Catégorie</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value) => setCategory(value)}
                value={category}
                placeholder="Quelle est la catégorie?"
              />
            </View>
            {/* Champ pour la description */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Dites nous pourquoi vous n'en voulez plus"
              />
            </View>
            <View style={styles.imagePickerContainer}>
              <Text style={styles.label}>Ajouter des photos</Text>
              {/* Bouton pour ouvrir l'appareil photo */}
              <View style={styles.cameraIconContainer}>
                <TouchableOpacity
                  onPress={() => pickImage()}
                  style={styles.imagePickerButton}
                >
                  <Text style={styles.imagePickerButtonText}>
                    Sélectionner dans la galerie ou
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => takePhoto()}
                  style={styles.cameraIcon}
                >
                  <AntDesign
                    name="camera"
                    size={20}
                    color="#EDFC92"
                    backgroundColor="#274539"
                  />
                </TouchableOpacity>
              </View>
              {/* Afficher les images sélectionnées */}
              <FlatList
                data={selectedImages}
                renderItem={SelectedImageItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
              />
            </View>
            {/* Champ pour la quantité */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantité</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value) => setQuantity(value)}
                value={quantity}
                placeholder="Combien de pièces?"
              />
            </View>
            {/* Champ pour la disponibilité */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Disponibilité</Text>
              <Calendar
              style={{fontFamily:"Poppins"}}
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#274539' }, // date sélectionnée en vert
            }}
            theme={customTheme} // Utiliser le thème personnalisé pour modifier les couleurs du calendrier
          />
            </View>
            {/* Bouton de soumission de l'annonce */}
            <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
              <Text style={styles.login}>Publiez votre annonce</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
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
  },
  topContainer: {
    backgroundColor: "#274539",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 30,
    fontFamily: "MontserratBold",
    color: "white",
  },
  bottomContainer: {
    padding: 20,
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  input: {
    backgroundColor: "#F6F8F7",
    padding: 13,
    borderRadius: 4,
    width: "100%",
    fontFamily: "Poppins",
  },
  imagePickerContainer: {
    flex: 1,
    marginBottom: 20,
  },
  cameraIconContainer: {
    flex: 1,
    backgroundColor: "#F6F8F7",
    borderRadius: 4,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  imagePickerButton: {
    backgroundColor: "#F6F8F7",
    padding: 13,
    borderRadius: 4,
    justifyContent: "center",
  },
  imagePickerButtonText: {
    fontFamily: "Poppins",
    color: "#555",
  },
  selectedImageItem: {
    marginRight: 10,
  },
  selectedImage: {
    flexWrap: "wrap",
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 4,
    margin: 5,
  },
  btnLogin: {
    backgroundColor: "#EDFC92",
    padding: 10,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  login: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  zero: {
    color: "#EDFC92",
  },
  deleteIconContainer: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(39, 69, 57, 0.7)",
    borderRadius: 100,
    padding: 3,
  },
});
