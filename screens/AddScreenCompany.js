import React, { useState,useEffect } from "react";
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
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function AddScreenCompany({ navigation }) {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryPermission, setGalleryPermission]=useState(null);


  useEffect(()=>{
    (async()=>{
      const galleryStatus=await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status==="granted");
    })();
  }, []);
  
  const pickImage = async()=>{
    let result= await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[3,4],
      quality:1,
    });
    console.log(result);
    if (result.canceled){
setSelectedImage(result.assets)
    }
  };
if(galleryPermission===false){
  return <Text>No access to Internal Storage</Text>
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setTitle(value)}
                value={title}
                placeholder="Quel est le titre de votre annonce?"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Catégorie</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setCategory(value)}
                value={category}
                placeholder="Quel(s) type(s) de produit(s) avez-vous besoin?"
              />
            </View>
            <View style={styles.imagePickerContainer}>
              <Text style={styles.label}>Ajouter une photo</Text>
              <TouchableOpacity
                onPress={()=>pickImage()}
                style={styles.imagePickerButton}
              >
                <Text style={styles.imagePickerButtonText}>
                  Sélectionner une photo
                </Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage.assets }}
                  style={styles.selectedImage}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Dites nous pourquoi vous en avez besoin?"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Disponibilité</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setAvailability(value)}
                value={availability}
                placeholder="A partir de quand?"
              />
            </View>
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
  
    justifyContent: "center",
  },
  imagePickerButtonText: {
    fontFamily: "Poppins",
    color: "#555",
  },
  selectedImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 4,
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
});
