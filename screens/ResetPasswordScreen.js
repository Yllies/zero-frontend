import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function ResetPasswordScreen({navigation}) {
  const user = useSelector((state) => state.user.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleResetPassword = () => {
    fetch(`${BACK_URL}:3000/users/resetPassword/${user.token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: nickname,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
            alert("Votre mot de passe a été modifiée avec succès !")
            navigation.navigate("Login");
        } else {
            alert("Une erreur est survenue lors de la modification du mot de passe.")
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la réinitialisation du mot de passe:",
          error
        );
        // Affichez un message d'erreur ou gérez l'erreur
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
            <Text style={styles.title}>
              Réinitialisez votre mot de<Text style={styles.zero}> passe</Text>
            </Text>
          </View>
          <View style={styles.bottomContainer}>

      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity  title="Réinitialiser le mot de passe"
        onPress={handleResetPassword}  style={styles.btnLogin} >
            <Text style={styles.login}>Modifier </Text>
      </TouchableOpacity>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
  },
  topContainer: {
    backgroundColor: "#274539",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bottomContainer: {
flex:1,
    alignItems: "center",
    
  },
  title: {
    width: "80%",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "MontserratBold",
    color: "white",
  },
  input: {
    backgroundColor: "#F6F8F7",
    padding: 13,
    fontSize: 15,
    marginTop: 40,
    borderRadius: 4,
    width: 300,
    fontFamily: "Poppins",
  
  },
  zero: {
    color: "#EDFC92",
  },
  btnLogin: {
    backgroundColor: "#EDFC92",
    padding: 13,
    fontSize: 15,
    marginTop: 40,
    borderRadius: 4,
    width: 300,
    fontFamily: "Poppins",
    
  
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
   
    // marginBottom: 25,

  },
  login: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
});
