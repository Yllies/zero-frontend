import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

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

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [address, setAdress] = useState({
    title: "",
    latitude: "",
    longitude: "",
    longitudeDelta: "",
    latitudeDelta: "",
  });
  const [siren, setSiren] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passewordError, setPassewordError] = useState(false);
  //useState pour les suggestions
  const [dataSet, setDataSet] = useState([]);

  //fonction de recherche pour l'autocomplete des addresses
  const searchAdress = (query) => {
    // Prevent search with an empty query
    if (query.length < 4) {
      return;
    } else {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`)
        .then((response) => response.json())
        .then((response) => {
          const suggestions = response.features.map((data, i) => {
            return {
              id: i,
              title: data.properties.label,
              context: data.properties.context,
              latitude: data.geometry.coordinates[0],
              longitude: data.geometry.coordinates[1],
              latitudeDelta: data.properties.x,
              longitudeDelta: data.properties.y,
            };
          });
          setDataSet(suggestions);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
          setDataSet([]);
        });
    }
  };

  // Regex pour vérifier que l'email est valide
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(address);
  const handleSignup = () => {
    let hasError = false;
    // l'email est incorrect
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    // les mots de passe ne correspondent pas
    if (password !== confirmPassword) {
      setPassewordError(true);
      hasError = true;
    } else {
      setPassewordError(false);
    }

    // si les mdp + email ok > on fetch
    if (!hasError) {
      fetch(`${BACK_URL}:3000/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          username,
          name,
          siret_siren: siren,
          email,
          password,
          address: address.title,
          latitude: address.latitude,
          longitude: address.longitude,
          longitudeDelta: address.longitudeDelta,
          latitudeDelta: address.latitudeDelta,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.result);

          // si tous les champs ne sont pas remplis> alerte
          if (!data.result) {
            alert("Merci de remplir tous les champs");
          } else {
            dispatch(
              login({
                name: data.name,
                email: data.email,
                token: data.token,
                type: data.type,
              }),
              setType(""),
              setUsername(""),
              setName(""),
              setAdress(""),
              setEmail(""),
              setSiren(""),
              setPassword(""),
              setConfirmPassword(""),
              navigation.navigate("TabNavigator", { screen: "Accueil" })
            );
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContain}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            Bienvenue parmis <Text style={styles.zero}>nous!</Text>
          </Text>
          <Text style={styles.textWelcome}>Créer votre compte</Text>
        </View>
        <ScrollView>
          {/* <View style={styles.topContainer}>
            <Text style={styles.title}>Créer un compte </Text>
            <Text style={styles.textWelcome}>Bienvenue parmi nous !</Text>
          </View> */}
          <View style={styles.bottomContainer}>
            <View style={styles.form}>
              <View style={styles.topForm}>
                <Text style={styles.youAre}>Vous êtes une:</Text>
                <View style={styles.choiceType}>
                  <TouchableOpacity
                    onPress={() => setType("Entreprise")}
                    value={type}
                    style={styles.btnChoice}
                  >
                    <Text style={styles.company}>ENTREPRISE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setType("Association")}
                    value={type}
                    style={styles.btnChoice}
                  >
                    <Text style={styles.association}>ASSOCIATION</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottomForm}>
                <View>
                  <Text style={styles.label}>Identifiant</Text>
                  <TextInput
                    onChangeText={(value) => setUsername(value)}
                    value={username}
                    style={styles.input}
                    placeholder="John Doe"
                  />
                </View>

                <View>
                  <Text style={styles.label}>Nom de la structure</Text>
                  <TextInput
                    onChangeText={(value) => setName(value)}
                    value={name}
                    style={styles.input}
                    placeholder="Grocery Company"
                  />
                </View>

                <View>
                  <Text style={styles.label}>Adresse de la structure</Text>
                  <AutocompleteDropdown
                    onChangeText={(value) => searchAdress(value)}
                    onSelectItem={(item) =>
                      item &&
                      setAdress((prevState) => ({
                        ...prevState,
                        title: item.title,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        longitudeDelta: item.longitudeDelta,
                        latitudeDelta: item.latitudeDelta,
                      }))
                    }
                    placeholder="Rue D 59255 Haveluy"
                    dataSet={dataSet}
                    value={address.title}
                    textInputProps={{ placeholder: "" }}
                    inputContainerStyle={styles.input}
                    containerStyle={styles.dropdownContainer}
                    suggestionsListContainerStyle={
                      styles.suggestionListContainer
                    }
                    closeOnSubmit
                  />
                </View>

                <View>
                  <Text style={styles.label}>Numéro de SIREN</Text>
                  <TextInput
                    onChangeText={(value) => setSiren(value)}
                    value={siren}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    placeholder="123456789"
                  />
                </View>

                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="johndoe@grocerycompany.com"
                  />
                  {emailError && (
                    <Text style={styles.error}>Adresse email invalide</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Mot de passe</Text>
                  <TextInput
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="AbeJp4P644Lh6b"
                  />
                  {passewordError && (
                    <Text style={styles.error}>
                      Les mots de passe ne correspondent pas
                    </Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>
                    Confirmation du mot de passe{" "}
                  </Text>
                  <TextInput
                    onChangeText={(value) => setConfirmPassword(value)}
                    value={confirmPassword}
                    secureTextEntry={true}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="AbeJp4P644Lh6b"
                  />
                </View>

                <TouchableOpacity
                  onPress={() => handleSignup()}
                  style={styles.btnSignUp}
                >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  zero: {
    color: "#EDFC92",
  },
  topContainer: {
    backgroundColor: "#274539",
    height: 160,
    justifyContent: "center",
    // alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    color: "white",
  },
  mainContain: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    width: "100%",
    fontSize: 30,
    marginTop: 10,
    fontWeight: "600",
    marginLeft: 20,
    fontFamily: "MontserratBold",
    color: "white",
  },
  textWelcome: {
    marginLeft: 25,
    marginTop: 7,
    fontFamily: "MontserratBold",
    fontSize: 17,
    color: "white",
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
    // width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 13,
    fontFamily: "PoppinsBold",
  },
  association: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "PoppinsBold",
  },
  youAre: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  bottomForm: {
    height: "85%",
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    marginBottom: 60,
  },
  label: {
    fontSize: 15,
    marginBottom: 3,
    marginTop: 10,
    fontFamily: "Poppins",
  },
  input: {
    fontSize: 15,
    backgroundColor: "#F6F8F7",
    padding: 10,
    fontSize: 15,
    borderRadius: 4,
    width: 300,
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  btnSignUp: {
    backgroundColor: "#EDFC92",
    padding: 13,
    width: 290,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 50,
  },
  loginHere: {
    marginTop: 10,
    fontFamily: "Poppins",
  },
  signup: {
    fontFamily: "Poppins",
  },
  error: {
    marginTop: 7,
    color: "red",
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
  },
  // suggestionListContainer: {
  //   borderRadius: 3,
  //   backgroundColor: "rgba(255, 255, 255, 0.9)",
  // },
  resultContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 6,
    padding: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#51e181",
    borderWidth: 1,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
  },
  suggestionListContainer: {
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  resultContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 6,
    padding: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#51e181",
    borderWidth: 1,
  },
});
