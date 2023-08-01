import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import login from'../reducers/user'


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

export default function SignUpScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    "Montserrat": require("../assets/fonts/Montserrat-Regular.ttf"),
    "MontserratBold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),

  });

  const dispatch = useDispatch();


  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [siren, setSiren] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleSignup  = () => {

if ( password === confirmPassword) {

    fetch('http://10.20.2.178:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name, siret_siren: siren, email, password}),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({name, email, token: data.token }));
          setType('');
          setName('');
          setSiren('');
          setEmail('');
          setPassword('');
          confirmPassword('');
        } 
        console.log("register")
      });
  }
}

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
            <Text style={styles.title}>Créer un compte </Text>
            <Text style={styles.textWelcome}>Bienvenue parmi nous !</Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.form}>
              <View style={styles.topForm}>
                <Text style={styles.youAre}>Vous êtes une:</Text>
                <View style={styles.choiceType}>
                  <TouchableOpacity onPress={() => setType("Entreprise")} value={type}
                   style={styles.btnChoice}>
                    <Text style={styles.company}>ENTREPRISE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setType("Association")} value={type}
                  style={styles.btnChoice}>
                    <Text style={styles.association}>ASSOCIATION</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottomForm}>
                <View>
                  <Text style={styles.label}>Nom de la structure</Text>
                  <TextInput onChangeText={(value) => setName(value)} value={name}
                    style={styles.input}
                    placeholder=""
                  />
                </View>
                <View>
                  <Text style={styles.label}>Numéro de SIREN</Text>
                  <TextInput onChangeText={(value) => setSiren(value)} value={siren}
                  style={styles.input} placeholder="" />
                </View>
                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput onChangeText={(value) => setEmail(value)} value={email}
                    style={styles.input}
                    placeholder=""
                  />
                </View>
                <View>
                  <Text style={styles.label}>Mot de passe</Text>
                  <TextInput onChangeText={(value) => setPassword(value)} value={password} 
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder=""
                  />
                </View>
                <View>
                  <Text style={styles.label}>Confirmation du mot de passe </Text>
                  <TextInput onChangeText={(value) => setconfirmPassword(value)} value={confirmPassword} 
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder=""
                  />
                </View>

                <TouchableOpacity onPress={() => handleSignup()} style={styles.btnSignUp}>
                  <Text style={styles.signup}>S'inscrire</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={styles.loginHere}
                >
                  <Text style={{ textAlign: "center", fontFamily: "Poppins" }}>
                    Vous avez déjà un compte ? Connectez-vous ici !
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );}
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
    fontFamily:"MontserratBold"
  },
  textWelcome: {
    marginLeft: 25,
    marginTop: 7,
    fontFamily:"Poppins"

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
    width: 130,
    padding: 13,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    alignItems: "center",
    

  },
  company: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    fontFamily:"MontserratBold"
  },
  association: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    fontFamily:"MontserratBold"

  },
  youAre: {
    marginLeft: 18,
    fontSize: 15,
    fontFamily:"Poppins"

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
    fontFamily:"Poppins"

  },
  input: {
    fontSize: 15,
    backgroundColor: "#F6F8F7",
    padding: 10,
    fontSize: 15,
    borderRadius: 4,
    width: 300,
    fontFamily:"Poppins"

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
    fontFamily:"Poppins"
  },
  signup:{
    fontFamily:"Poppins"
  }
});
