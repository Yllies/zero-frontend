import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import * as Location from "expo-location";
import { useDispatch } from 'react-redux';
import { addQuantity, addDate, addLocalisation,removeFilter, addRadius, addDisplay } from '../reducers/filter';

export default function FilterScreen({ navigation, onClose }) {
  
  const dispatch = useDispatch();

//-------------------------------------- LOCALISATION

// Current position 
const [currentPosition, setCurrentPosition] = useState({});

// Slider de localisation
const [sliderValue, setSliderValue] = useState(50);
  
const onSliderValueChange = (value) => {
        setSliderValue(value);
        console.log("je veux la valeur",value)
        dispatch(addRadius(value)); };

// Accès à la localisation de l'utilisateur
useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude })
            console.log("test", currentPosition )
            dispatch(addLocalisation({ latitude: location.coords.latitude, longitude: location.coords.longitude }));
          });
      }

      console.log("loc envoyée au store",currentPosition)

    })();
  }, [sliderValue]);


// -----------------------------------------CHIPS

  //  Etat de la chips selectionnée
  const [selectedChip, setSelectedChip] = useState(null);

  // selection des filtres "chips"

  // Lorsque clic sur une puce, la fonction handleChipPress est appelée. Cette fonction prend la chips du clic en paramètre, et elle vérifie si cette puce est déjà dans le tableau selectedChips ou non.

  // Si la puce est déjà dans le tableau, cela signifie qu'on veut la désélectionner, donc elle est retirée du tableau, autrement ça veut dire qu'on veut l'ajouter au tableau



  const handleChipPress = (chip) => {

    // Le but est d'envoyer la quantité au store mais React ne met pas immédiatement à jour le tableau donc il faut passer par un calcul de la sélection actuelle/etat local actuel et c'est ça qu'on va pousser au store

    if (selectedChip === chip) {
      setSelectedChip(null); // Désélectionner la puce actuellement sélectionnée
    } else {
      setSelectedChip(chip); // Sélectionner la nouvelle puce
    }

  
    // il faut faire une conversion pour obtenir le nombre de lot en number 

    let quantityRange = null;

    switch (chip) {
      case "1 article":
        quantityRange = [1, 1];
        break;
      case "Moins de 5 articles":
        quantityRange = [1, 4];
        break;
      case "Moins de 10 articles":
        quantityRange = [1, 9];
        break;
      case "Lot de 10 à 50":
        quantityRange = [10, 50];
        break;
      case "Lot de 50 à 1OO":
        quantityRange = [51, 100];
        break;
      case "Plus de 150":
        quantityRange = [150, Infinity];
        break;
      default:
        // Gérer tout autre cas par : 
        break;
    }
  

    dispatch(addQuantity(quantityRange));
    console.log("qté envoyé au store",quantityRange)

  };


  const renderChip = (label) => {
    const isSelected = selectedChip === label; // Vérifier si la puce est sélectionnée
    return (
      <TouchableOpacity
        key={label}
        onPress={() => handleChipPress(label)}
        style={[
          styles.chip,
          isSelected ? styles.selectedChip : null,
        ]}
      >
        <Text style={[styles.chipText, isSelected ? styles.selectedChipText : null]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  // ------------------------------ CALENDRIER

  const [selectedDate, setSelectedDate] = useState("");

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log("date envoyée au store",day.dateString);
    dispatch(addDate(day.dateString));
  };

  const customTheme = {
    todayTextColor: "#EDFC92",
    arrowColor: "#EDFC92",
  };

  const handleDisplay = () => {
		dispatch(addDisplay(true));
    onClose()
  }

  // -------------------------- EFFACER LES FILTRES

  const handleErase = () => {
		dispatch(removeFilter());
    setSliderValue(0);
    setSelectedDate("");
    setSelectedChip(null); // Remettre la puce sélectionnée à null
    setCurrentPosition(null); // Remettre la position actuelle à null
	};


  // ----------------------------


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.Title}>Filtres</Text>
          <FontAwesome
            onPress={() => onClose()}  // Utilisez la fonction navigation.goBack() pour fermer la page
            style={styles.iconeFilter}
            name="close"
            size={28}
            color="#274539"
          />
        </View>

        <Text style={styles.subTitle}>Quantité</Text>
        <View style={styles.containerChips}>
          {renderChip("1 article")}
          {renderChip("Moins de 5 articles")}
          {renderChip("Moins de 10 articles")}
          {renderChip("Lot de 10 à 50")}
          {renderChip("Lot de 50 à 1OO")}
          {renderChip("Plus de 150")}
        </View>

        <Text style={styles.subTitle}>Localisation</Text>
        <View style={styles.containerSlider}>
          <Text style={styles.text}>Dans un rayon de: {sliderValue} km</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={30}
            step={1}
            value={sliderValue}
            onValueChange={setSliderValue}
            minimumTrackTintColor="#274539"
            thumbTintColor="#EDFC92"
          />
        </View>

        <Text style={styles.subTitle}>Disponibilité</Text>
        <View style={styles.containerCalendrier}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#274539" },
            }}
            theme={customTheme}
          />
        </View>

        <View style={styles.btnContainer}>


          <TouchableOpacity 
          style={styles.btnAppliquer}
          onPress={() => handleDisplay()}
          >
            <Text style={styles.textBtn1}>Appliquer</Text>
          </TouchableOpacity>

          <TouchableOpacity 
           onPress={() => handleErase()} 
          style={styles.btnEffacer}>
            <Text style={styles.textBtn}>Effacer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Poppins",
  },
  scrollContainer:{
backgroundColor:"white"
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "10%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },

  Title: {
    fontSize: 30,
    fontFamily: "MontserratBold",
    color: "black",
    fontSize: 30,
  },

  subTitle: {
    fontFamily: "Poppins",
    color: "black",
    fontSize: 15,
    paddingLeft: "7%",
    paddingTop: "10%",
    paddingBottom: "3%",
  },

  containerSlider: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: "2%",
    paddingBottom: "2%",
  },

  text: {
    paddingTop: "3%",
    fontSize: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "#274539",
    fontFamily: "Poppins",
  },

  slider: {
    width: "90%",
  },

  containerChips: {
    paddingLeft: "4%",
    flexDirection: "row", // Chips à l'horizontal
    flexWrap: "wrap", // Faire passer les chips à la ligne si besoin
    alignItems: "center",
    justifyContent: "flex-start", // Aligner les chips à gauche
    paddingBottom: "2%",
    fontFamily: "Poppins",
  },

  chip: {
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#EDFC92",
  },

  selectedChip: {
    backgroundColor: "#274539",
  },

  chipText: {
    fontSize: 15,
    color: "#274539",
  },

  selectedChipText: {
    color: "white",
  },

  containerCalendrier: {
    width: "90%",
    justifyContent: "flex-start",
    paddingTop: "2%",
    paddingLeft: "6%",
    paddingBottom: "12%",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingRight: "5%",
    paddingLeft: "2%",
  },

  btnAppliquer: {
    backgroundColor: "#EDFC92",
    padding: "4%",
    width: "40%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
    borderRadius: 4,
    fontFamily: "Poppins",
  },

  btnEffacer: {
    backgroundColor: "#274539",
    padding: "4%",
    width: "40%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
    borderRadius: 4,
    fontFamily: "Poppins",
  },

  textBtn1: {
    color: "#274539",
    fontFamily: "Poppins",
  },
  textBtn: {
    color: "white",
    fontFamily: "Poppins",
  },
});
