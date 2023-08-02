import React, { useState, useEffect } from "react";
import {
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
  FlatList,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddScreenCompany({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [galleryPermission, setGalleryPermission] = useState(null);

  useEffect(() => {
    // Vérifier et demander la permission d'accéder à la galerie
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  // Fonction pour sélectionner des images depuis la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
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

  // Fonction pour supprimer une image du tableau selectedImages
  const removeImage = (imageUri) => {
    setSelectedImages(selectedImages.filter(image => image.uri !== imageUri));
  };

  // Si l'accès à la galerie est refusé, afficher un message d'erreur
  if (galleryPermission === false) {
    return <Text>Pas d'accès au stockage interne</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <Text style={styles.title}>Postez votre <Text style={styles.zero}>annonce</Text></Text>
        </View>
        <ScrollView style={styles.bottomContainer}>
          <View style={styles.form}>
            {/* Champ pour le titre */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
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
                onChangeText={(value) => setCategory(value)}
                value={category}
                placeholder="Quelle est la catégorie?"
              />
            </View>
            {/* Sélecteur d'images */}
            <View style={styles.imagePickerContainer}>
              <Text style={styles.label}>Ajouter des photos</Text>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={styles.imagePickerButton}
              >
                <Text style={styles.imagePickerButtonText}>
                  Sélectionner des photos
                </Text>
              </TouchableOpacity>
              {/* Afficher les images sélectionnées */}
              <View style={styles.selectedImagesContainer}>
                <FlatList
                  data={selectedImages}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <Image source={{ uri: item.uri }} style={styles.selectedImage} />
                      {/* Icône "times" pour supprimer l'image */}
                      <TouchableOpacity
                        onPress={() => removeImage(item.uri)}
                        style={styles.deleteIconContainer}
                      >
                        <FontAwesome name='times' size={20} color='#EDFC92' style={styles.deleteIcon} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
            {/* Champ pour la description */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Dites nous pourquoi vous n'en voulez plus"
              />
            </View>
            {/* Champ pour la disponibilité */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Disponibilité</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setAvailability(value)}
                value={availability}
                placeholder="A partir de quand?"
              />
            </View>
            {/* Bouton de soumission de l'annonce */}
            <TouchableOpacity style={styles.btnLogin}>
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
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: "#F6F8F7",
    padding: 13,
    borderRadius: 4,
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
  },
  imagePickerButtonText: {
    fontFamily: "Poppins",
    color: "#555",
  },
  selectedImage: {
    flexWrap: 'wrap',
    marginTop: 10,
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
  },
  login: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  zero: {
    color: "#EDFC92",
  },
  selectedImagesContainer: {
    flex: 1,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 12,
    right: 9,
    zIndex: 1,
    backgroundColor: 'rgba(39, 69, 57, 0.7)',
    // padding: 5,
    borderRadius: 100,
  },
  deleteIcon: {
margin:5,

  },
});
