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
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
SplashScreen.preventAutoHideAsync();

export default function LoginScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    "Montserrat": require("../assets/fonts/Montserrat-Regular.ttf"),
    "MontserratBold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(fontsLoaded){
    return (

    <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContain}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.topContainer}>
            <Text style={styles.title}>
              Bienvenue sur <Text style={styles.zero}>Zéro</Text>
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.form}>
              <View style={styles.email}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="johndoe@gmail.com"
                />
              </View>
              <View style={styles.password}>
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput style={styles.input} placeholder="3j48wWpLkk4R9J" />
              </View>
              <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.login}>Connexion</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Mot de passe oublié ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                style={styles.signupHere}
              >
                <Text style={{ textAlign: "center",     fontFamily:"Poppins"
 }}>
                  Vous n'avez pas de compte ? Inscrivez-vous ici !
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
    }
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
    height: "40%",
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
    fontSize: 55,
    fontFamily: "MontserratBold",
    color:"white"
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
    fontSize: 15,
    marginTop: 10,
    borderRadius: 4,
    width: 300,
    fontFamily:"Poppins"
  },
  label: {
    fontSize: 15,
    fontFamily:"Poppins"

  },
  email: {
    marginBottom: 30,
    fontFamily:"Poppins"

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
    marginBottom: 25,
    
  },
  signupHere: {
    marginTop: 30,
  },
  login: {
    fontSize: 15,
    fontFamily:"Poppins"
  },
});
