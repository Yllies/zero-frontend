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
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import * as Location from "expo-location";


export default function FilterScreen({ navigation }) {
  
  // LOCALISATION

    // Current position 
const [currentPosition, setCurrentPosition] = useState(null);

  // Slider de localisation
const [sliderValue, setSliderValue] = useState(50);
  
const onSliderValueChange = (value) => {
        setSliderValue(value);
      };

// Accès à la localisation de l'utilisateur
useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 },
        (location) => {
          setCurrentPosition(location.coords);
        });
    }
  })();
}, []);


// Mise à jour de la localisation en fonction de la valeur du slider
useEffect(() => {
  if (currentPosition !== null) {
    // Calculer la nouvelle localisation en fonction du rayon sélectionné
    const latitude = currentPosition.latitude;
    const longitude = currentPosition.longitude;
    const newLatitude = latitude + (sliderValue * 0.009); // 0.009 est une valeur approximative pour convertir km en degrés
    const newLongitude = longitude + (sliderValue * 0.009);

    // Mettre à jour la localisation avec la nouvelle valeur
    const newLocation = { latitude: newLatitude, longitude: newLongitude };
    dispatch(addLocalisation({newLocation}));
  }
}, [sliderValue, currentPosition]);

// ----------------------------------------------

    //  tableau qui contiendra les "chips" sélectionnées
  const [selectedChips, setSelectedChips] = useState([]);


  // selection des filtres "chips"
  // fonction appelée quand on clic sur un chip

  const handleChipPress = (chip) => {
    if (selectedChips.includes(chip)) {
      // Si le chip est déjà sélectionné, le désélectionner
      setSelectedChips((selectedChips) =>
        selectedChips.filter((item) => item !== chip)
      );
    } else {
      // Sinon, le pousser dans le tableau des chips sélectionnées
      setSelectedChips((selectedChips) => [...selectedChips, chip]);
    }
    dispatch(addQuantity(selectedChips));
  };

  // Vérifie si la chip séléctionée est dans le tableau et renvoi une valeur boolean
  const renderChip = (chip) => {
    const isSelected = selectedChips.includes(chip);

    return (
      <TouchableOpacity
        key={chip}
        onPress={() => handleChipPress(chip)}
        // on applique un style sur le bouton si la chip est sélectionnée + sur le texte
        style={[styles.chip, isSelected ? styles.selectedChip : null]}
      >
        <Text
          style={[styles.chipText, isSelected ? styles.selectedChipText : null]}
        >
          {chip}
        </Text>
      </TouchableOpacity>
    );
  };

 // Calendrier
        const [selectedDate, setSelectedDate] = useState("");


  // Calendrier
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    dispatch(addDate(selectedDate));
  };

  // Changez la couleur du jour actuel + flèches de navigation en vert
  const customTheme = {
    todayTextColor: "#EDFC92",
    arrowColor: "#EDFC92",
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View contentContainerStyle={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.Title}>Filtres</Text>
          <FontAwesome
            onPress={() => navigation.navigate("Accueil")}
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
          {renderChip("moins de 10 articles")}
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
            onValueChange={onSliderValueChange}
            minimumTrackTintColor="#274539"
            thumbTintColor="#EDFC92"
          />
        </View>

        <Text style={styles.subTitle}>Disponibilité</Text>
        <View style={styles.containerCalendrier}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#274539" }, // date sélectionnée en vert
            }}
            theme={customTheme} // Utiliser le thème personnalisé pour modifier les couleurs du calendrier
          />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnAppliquer}>
            <Text style={styles.textBtn1}>Appliquer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnEffacer}>
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
