import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
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
  ScrollView,
} from "react-native";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Regex pour vérifier que l'email est valide
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Redirect to /home if logged in
  // if (user.token) {
  //   navigation.navigate('Accueil');
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [dataError, setDataError] = useState(false);

  const handleSignin = () => {
    // verification de l'email
    if (!EMAIL_REGEX.test(email)) {
      console.log("mauvais email");
      setEmailError(true);
    } else {
      fetch(`${BACK_URL}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // verification de la correspondante email + mdp
          if (data.error) {
            // Handle fetch error, display an error message, etc.
            // console.error('Login failed:', error);
            // alert('An error occurred while trying to log in. Please try again later.');
            setEmailError(false);
            setDataError(true);
          } else {
            // Redirect to "Accueil" page
            setDataError(false);

            dispatch(
              login({
                token: data.token,
                email: data.email,
                name: data.name,
                type: data.type,
              })
            );
            navigation.navigate("TabNavigator", { screen: "Acceuil" });
            setDataError(false)
            setEmailError(false)
          }
        });
      // .catch(error => {
      //   // Handle fetch error, display an error message, etc.
      //   console.error('Login failed:', error);
      //   alert('An error occurred while trying to log in. Please try again later.');
      // });
    }
  };
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
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                  placeholder="johndoe@grocerycompany.com"
                />
                {emailError && (
                  <Text style={styles.error}>Adresse email invalide</Text>
                )}
              </View>

              <View style={styles.password}>
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                  placeholder="XH2LQ869pgpr3z"
                />
                {dataError && (
                  <Text style={styles.error}>Mauvais identifiants ! </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => handleSignin()}
                style={styles.btnLogin}
              >
                <Text style={styles.login}>Connexion</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.signupHere}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signupHere}>
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
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    fontSize: 15,
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
    marginBottom: 25,
    borderRadius: 4,
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
  mdp: {
    fontFamily: "Poppins",
  },
  error: {
    marginTop: 7,
    color: "red",
  },
});
