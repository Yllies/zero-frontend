import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handelLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.TopContainer}>
          <Image
            source={require("../assets/me.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <FontAwesome
                name="star"
                color="#254739"
                size={40}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                name="heart"
                color="#EDFC92"
                size={40}
                style={styles.icons}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Qui sommes-nous?</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <Image
            source={require("../assets/me.jpg")}
            style={styles.map}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Infos Complémentaire</Text>
          <View style={styles.InfosContainer}>
            <Text style={styles.titleInfo}>
              {" "}
              <FontAwesome
                name="map-pin"
                color="#EDFC92"
                size={40}
                style={styles.icons}
              />{" "}
              Adress
            </Text>
            <Text style={styles.textInfo}>ghir h'na</Text>

            <Text style={styles.titleInfo}>
              {" "}
              <FontAwesome
                name="lock"
                color="#EDFC92"
                size={40}
                style={styles.icons}
              />{" "}
              Horaires
            </Text>
            <Text style={styles.textInfo}>
              Quand je me reveille à quand j'en ai marre
            </Text>
          </View>
          <Text style={styles.title}>Points Forts</Text>
          <View style={styles.PFContainer}>
            <Text style={styles.Number}>
              8 <Text style={styles.PFText}>euro dans la poche</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.btnContact}>
            <Text style={styles.Contact}>
              Contacter l'Entreprise{" "}
              <FontAwesome
                name="arrow-right"
                color="#EDFC92"
                size={30}
                style={styles.icons}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    // borderRadius: 0 0 30 0
    height: 320,
    width: 250,
    borderBottomRightRadius: 30,
  },
  TopContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  iconContainer: {
    // flexDirection: "column",
    position: "absolute",
    top: 20,
    right: 20,
  },

  buttonContainer: {
    marginTop: 250,
    // Ajustez la marge supérieure en fonction de la disposition souhaitée
  },
  title: {
    color: "black",
  },
  button: {
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
  buttonText: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  botcontiner: {
    justifyContent: "flex-start", // Updated from 'center' to 'flex-start'
    alignItems: "flex-start", // Updated from 'center' to 'flex-start'
    marginTop: 250, // You can adjust the marginTop as needed
  },
  icons: {
    marginTop: 50,
    marginBottom: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: "flex-start",
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 25,
    lineHeight: 54.5 /* 218% */,
  },
  description: {
    color: 676767,
    fontFamily: "Poppins",
    fontSize: 17,
  },
  map: {
    height: 120,
    width: 240,
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  InfosContainer: {
    borderRadius: 10,
    backgroundColor: "#254739",
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  textInfo: {
    color: "white",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  titleInfo: {
    fontSize: 25,
    lineHeight: 54.5,
    color: "white",
  },
  PFContainer: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#EDFC92",
    paddingLeft: 40,
    paddingTop: 20,
  },
  PFText: {
    color: "#274539",
    fontSize: 18,
  },
  Number: {
    color: "#274539",
    fontSize: 105.799,
    marginTop: -75,
  },
  btnContact: {
    backgroundColor: "#274539",
    padding: 10,
    width: 290,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 25,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  Contact: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
});

export default UserProfile;
