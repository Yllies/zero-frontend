import { useState, useEffect } from "react";
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
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContain}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            Bienvenue sur <Text style={styles.zero}>Zéro</Text>
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.form}>
            <View style={styles.email}>
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} placeholder="" />
            </View>
            <View style={styles.password}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput style={styles.input} placeholder="" />
            </View>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.login}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupHere}>
              <Text>Vous n'avez pas de compte ? Inscrivez-vous ici !</Text>
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
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  title: {
    width: "80%",
    textAlign: "center",
    fontSize: 60,
  },
  zero: {
    color: "#EDFC92",
  },
  bottomContainer: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
    height: "70%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F6F8F7",
    padding: 13,
    fontSize: 25,
    marginTop: 10,
    borderRadius: 4,
    width: 300,
  },
  label: {
    fontSize: 25,
  },
  email: {
    marginBottom: 30,
  },
  password: {
    marginBottom: 50,
  },
  btnLogin: {
    backgroundColor: "#EDFC92",
    padding: 13,
    width: 290,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
  },
  signupHere: {
    marginTop: 30,
  },
  login: {
    fontSize: 20,
  },
});
