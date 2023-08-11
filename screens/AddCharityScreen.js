import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
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

export default function AddCharityScreen({ navigation }) {
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
              Postez votre demande de <Text style={styles.zero}>besoin</Text>
            </Text>
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(value) => setTitle(value)}
                value={title}
                placeholder="Vêtements de tout type"
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
                placeholder="Nous avons besoin d'habits afin de les redistribuer..."
              />
            </View>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.login}>Publiez votre demande</Text>
            </TouchableOpacity>
          </View>
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
    textAlign: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: "MontserratBold",
    color: "white",
    textAlign: "center",
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
