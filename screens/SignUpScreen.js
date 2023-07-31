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

export default function SignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContain}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <Text style={styles.title}>Créer un compte </Text>
          <Text style={styles.textWelcome}>Bienvenue parmi nous !</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.form}>
            <View style={styles.topForm}>
              <Text style={styles.youAre}>Vous êtes :</Text>
              <View style={styles.choiceType}>
                <TouchableOpacity style={styles.btnChoice}>
                  <Text style={styles.company}>ENTREPRISE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnChoice}>
                  <Text style={styles.association}>ASSOCIATION</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomForm}>
              <View style={styles.email}>
                <Text style={styles.label}>Nom de la structure</Text>
                <TextInput style={styles.input} placeholder="Factory company" />
              </View>
              <View style={styles.password}>
                <Text style={styles.label}>Numéro de SIREN</Text>
                <TextInput style={styles.input} placeholder="492061046" />
              </View>
              <View style={styles.password}>
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="3j48wWpLkk4R9J"
                />
              </View>
              <Text style={styles.label}>Confirmation du mot de passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="3j48wWpLkk4R9J"
              />
              <TouchableOpacity style={styles.btnSignUp}>
                <Text style={styles.signup}>S'inscrire</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={styles.loginHere}
              >
                <Text style={{ textAlign: "center" }}>
                  Vous avez déjà un compte ? Connectez-vous ici !
                </Text>
              </TouchableOpacity>
            </View>
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
    height: "10%",
    width: "100%",
  },
  title: {
    width: "100%",
    fontSize: 25,
    marginTop: 10,
    fontWeight: "600",
    marginLeft: 20,
  },
  textWelcome: {
    marginLeft: 25,
    marginTop: 7,
  },
  bottomContainer: {
    height: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  form: {
    width: "80%",
    height: "70%",
  },
  topForm: {
    width: "100%",
    height: "17%",
  },
  choiceType: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 7,
  },
  btnChoice: {
    backgroundColor: "#274539",
    width: 150,
    padding: 13,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
  },
  company: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  association: {
    color: "white",
    textAlign: "center",
  },
  youAre: {
    marginLeft: 6,
    fontSize: 15,
  },
  bottomForm: {
    height: "85%",
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    marginBottom: 3,
    marginTop: 10,
  },
  input: {
    fontSize: 20,
    backgroundColor: "#F6F8F7",
    padding: 10,
    fontSize: 20,
    // marginTop: 10,
    borderRadius: 4,
    width: 300,
  },
  btnSignUp: {
    backgroundColor: "#EDFC92",
    padding: 13,
    width: 290,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 30,
  },
  loginHere: {
    marginTop: 10,
  },
});
