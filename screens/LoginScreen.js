import { useState, useEffect } from "react";
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
} from "react-native";
import { login } from "../reducers/user";

export default function HomeScreen() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Redirect to /home if logged in
  // if (user.token) {
  //   navigation.navigate('Accueil');
  // }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignin = () => {
  useEffect(() => {
    fetch('http://10.20.2.175:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ token: data.token, email: data.email, name: data.name }));
      });
    }, []);
  }




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
              <TextInput style={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="johndoe@gmail.com" />
            </View>
            <View style={styles.password}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput style={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
            </View>
            <TouchableOpacity onPress={() => handleSignin()}style={styles.btnLogin}>
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
