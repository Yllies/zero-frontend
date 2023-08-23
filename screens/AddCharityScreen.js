import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function AddCharityScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user.value);

  const handleSubmit = () => {
    if (!title || !description || category==="") {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newPostData = {
      title,
      description,
      category,
    };

    fetch(`${BACK_URL}:3000/posts/charity/publish/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("from front", user.token);

        if (data.result) {
          alert("Votre annonce a été publiée avec succès !");
          navigation.navigate("Accueil");
          setTitle("");
          setDescription("");
          setCategory(""); // Set the initial category
        } else {
          alert("Une erreur est survenue lors de la publication de l'annonce.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la publication de l'annonce :", error);
        alert("Une erreur est survenue lors de la publication de l'annonce.");
      });
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value) => setTitle(value)}
                value={title}
                placeholder="Palette de vêtements"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Catégorie</Text>
              <Picker
                selectedValue={category}
                style={styles.input}
                mode={"dialog"}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                  <Picker.Item label="" value="" />
                <Picker.Item label="Vetements" value="Vetements" />
                <Picker.Item label="Meubles" value="Meubles" />
                <Picker.Item label="High-Tech" value="High-Tech" />
                <Picker.Item label="Electroménager" value="Electroménager" />
                <Picker.Item label="Jeux" value="Jeux" />
                <Picker.Item label="Enfants" value="Enfants" />
                <Picker.Item label="Autres" value="Autres" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Nous donnons ces ..."
              />
            </View>

            <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
              <Text style={styles.login}>Publiez votre demande</Text>
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
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    // flexWrap: "wrap",
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
    marginBottom: 130,
    marginTop:40,
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
