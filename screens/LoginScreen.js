import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

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
import { login } from "../reducers/user";

export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Redirect to /home if logged in
  // if (user.token) {
  //   navigation.navigate('Accueil');
  // }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    fetch('http://10.20.2.175:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ token: data.token, email: data.email, name: data.name }));
          navigation.navigate("TabNavigator", { screen: "Acceuil" }); // Redirect to "Accueil" page
        } else {
          // Handle login failure, display an error message, etc.
          alert(data.error);
        }
      })
      .catch(error => {
        // Handle fetch error, display an error message, etc.
        console.error('Login failed:', error);
        alert('An error occurred while trying to log in. Please try again later.');
      });
  }




  return (
    <SafeAreaView style={styles.container}>
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
              <TextInput style={styles.input} onChangeText={(value) => setEmail(value)} value={email} placeholder="johndoe@gmail.com" />
            </View>
            <View style={styles.password}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput style={styles.input} onChangeText={(value) => setPassword(value)} value={password} placeholder="Password" />
            </View>
            <TouchableOpacity onPress={() => handleSignin()}style={styles.btnLogin}>
              <Text style={styles.login}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.signupHere}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text  style={styles.signupHere}>Vous n'avez pas de compte ? Inscrivez-vous ici !</Text>
            </TouchableOpacity>
          </View>
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    width: "80%",
    textAlign: "center",
    fontSize: 35,
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
    marginTop:70,
    height: 500,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F6F8F7",
    padding: 13,
    fontSize: 15,
    marginTop: 10,
    borderRadius: 4,
    width: 300,
  },
  label: {
    fontSize: 15,
  },
  email: {
    marginBottom: 30,
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
  },
});
