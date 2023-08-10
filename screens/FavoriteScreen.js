import { useState, useEffect } from "react";
import {Picker} from "@react-native-picker/picker";
import {

  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,

} from "react-native";

export default function FavoriteScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Vetement");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContain}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            <Text style={styles.white}>
              Liste des <Text style={styles.zero}>favoris</Text>
            </Text>
          </Text>
        </View>
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
   alignItems: "center",
  
  },
  topContainer: {
    backgroundColor: "#274539",
    height: 160,
    justifyContent: "center",
    textAlign:"center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: "MontserratBold",
    color: "white",
    textAlign:"center",
  
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
    marginTop: 30,
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
