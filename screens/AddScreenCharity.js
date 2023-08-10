import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import {Picker} from "@react-native-picker/picker";
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

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function AddScreenCharity({ navigation }) {
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
            <View style={styles.email}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setTitle(value)}
                value={title}
                placeholder="Quel est le titre de votre annonce?"
              />
            </View>
            <View style={styles.password}>
              <Text style={styles.label}>Catégorie</Text>
              <Picker
                selectedValue={category}
                style={{ height: 50, width: 250 }}
                mode={"dialog"}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
          <Picker.Item label="Vetement" value="Vetement"  />
          <Picker.Item label="Meubles" value="Meuble" />
          <Picker.Item label="High-Tech" value="High-Tech" />
          <Picker.Item label="Electroménager" value="Electroménager" />
          <Picker.Item label="Jeux" value="Jeux" />
          <Picker.Item label="Enfants" value="Enfants" />
          </Picker>

            </View>
            <View style={styles.password}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Dites nous pourquoi vous en avez besoin?"
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
  },
  mainContain: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    backgroundColor: "#274539",
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    fontFamily: "Montserrat",
  },
  title: {
    width: "80%",
    textAlign: "center",
    fontSize: 40,
    fontFamily: "MontserratBold",
    color: "white",
  },
  zero: {
    color: "#EDFC92",
    fontSize: 30,
  },
  white: {
    fontSize: 30,
  },
  bottomContainer: {
    height: "70%",
    alignItems: "center",
  },
  form: {
    width: "80%",
    height: 500,
    marginTop: 70,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F6F8F7",
    padding: 13,
    fontSize: 10,
    marginTop: 10,
    borderRadius: 4,
    width: 300,
    fontFamily: "Poppins",
  },
  label: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  email: {
    marginBottom: 30,
    fontFamily: "Poppins",
  },
  password: {
    marginBottom: 50,
  },
  btnLogin: {
    backgroundColor: "#EDFC92",
    padding: 10,
    width: 290,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
  },
  signupHere: {
    marginTop: 30,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  login: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  mdp: {
    fontFamily: "Poppins",
  },
});
