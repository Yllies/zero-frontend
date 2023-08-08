// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import Slider from "@react-native-community/slider";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { Calendar } from "react-native-calendars";
// import * as Location from "expo-location";
// import { useDispatch } from "react-redux";
// import { addLocalisation } from "../reducers/filter";
// import { addQuantity, addDate, addLocalisation } from "../reducers/filter";



// export default function FilterScreen({ navigation, onClose }) {
//   const dispatch = useDispatch();
//   // LOCALISATION

//     // Current position 
// const [currentPosition, setCurrentPosition] = useState(null);

//   // Slider de localisation
// const [sliderValue, setSliderValue] = useState(50);
  
// const onSliderValueChange = (value) => {
//         setSliderValue(value);
//       };

// // Accès à la localisation de l'utilisateur
// useEffect(() => {
//   (async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();

//     if (status === 'granted') {
//       Location.watchPositionAsync({ distanceInterval: 10 },
//         (location) => {
//           setCurrentPosition(location.coords);
//         });
//     }
//   })();
// }, []);


// // Mise à jour de la localisation en fonction de la valeur du slider
// useEffect(() => {
//   if (currentPosition !== null) {
//     // Calculer la nouvelle localisation en fonction du rayon sélectionné
//     const latitude = currentPosition.latitude;
//     const longitude = currentPosition.longitude;
//     const newLatitude = latitude + (sliderValue * 0.009); // 0.009 est une valeur approximative pour convertir km en degrés
//     const newLongitude = longitude + (sliderValue * 0.009);

//     // Mettre à jour la localisation avec la nouvelle valeur
//     const newLocation = { latitude: newLatitude, longitude: newLongitude };
//     dispatch(addLocalisation({newLocation}));
//   }
// }, [sliderValue, currentPosition]);

// // ----------------------------------------------

//     //  tableau qui contiendra les "chips" sélectionnées
//   const [selectedChips, setSelectedChips] = useState([]);


//   // selection des filtres "chips"
//   // fonction appelée quand on clic sur un chip

//   const [selectedDate, setSelectedDate] = useState("");



//   const handleChipPress = (chip) => {
//     if (selectedChips.includes(chip)) {
//       setSelectedChips((selectedChips) =>
//         selectedChips.filter((item) => item !== chip)
//       );
//     } else {
//       setSelectedChips((selectedChips) => [...selectedChips, chip]);
//     }
//     dispatch(addQuantity(selectedChips));
//   };

//   const renderChip = (chip) => {
//     const isSelected = selectedChips.includes(chip);

//     return (
//       <TouchableOpacity
//         key={chip}
//         onPress={() => handleChipPress(chip)}
//         style={[styles.chip, isSelected ? styles.selectedChip : null]}
//       >
//         <Text
//           style={[styles.chipText, isSelected ? styles.selectedChipText : null]}
//         >
//           {chip}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     dispatch(addDate(selectedDate));
//   };

//   const customTheme = {
//     todayTextColor: "#EDFC92",
//     arrowColor: "#EDFC92",
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <View style={styles.containerTitle}>
//           <Text style={styles.Title}>Filtres</Text>
//           <FontAwesome
//             onPress={() => onClose()}  // Utilisez la fonction navigation.goBack() pour fermer la page
//             style={styles.iconeFilter}
//             name="close"
//             size={28}
//             color="#274539"
//           />
//         </View>

//         <Text style={styles.subTitle}>Quantité</Text>
//         <View style={styles.containerChips}>
//           {renderChip("1 article")}
//           {renderChip("Moins de 5 articles")}
//           {renderChip("moins de 10 articles")}
//           {renderChip("Lot de 10 à 50")}
//           {renderChip("Lot de 50 à 1OO")}
//           {renderChip("Plus de 150")}
//         </View>

//         <Text style={styles.subTitle}>Localisation</Text>
//         <View style={styles.containerSlider}>
//           <Text style={styles.text}>Dans un rayon de: {sliderValue} km</Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0}
//             maximumValue={30}
//             step={1}
//             value={sliderValue}
//             onValueChange={onSliderValueChange}
//             minimumTrackTintColor="#274539"
//             thumbTintColor="#EDFC92"
//           />
//         </View>

//         <Text style={styles.subTitle}>Disponibilité</Text>
//         <View style={styles.containerCalendrier}>
//           <Calendar
//             onDayPress={onDayPress}
//             markedDates={{
//               [selectedDate]: { selected: true, selectedColor: "#274539" },
//             }}
//             theme={customTheme}
//           />
//         </View>

//         <View style={styles.btnContainer}>
//           <TouchableOpacity style={styles.btnAppliquer}>
//             <Text style={styles.textBtn1}>Appliquer</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.btnEffacer}>
//             <Text style={styles.textBtn}>Effacer</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

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
import { useDispatch } from "react-redux";
import { addQuantity, addDate, addLocalisation } from "../reducers/filter";

export default function FilterScreen({ navigation, onClose }) {
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Demande l'accès à la localisation de l'utilisateur
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

  useEffect(() => {
    if (currentPosition !== null) {
      // Calculer la nouvelle localisation en fonction du rayon sélectionné
      const latitude = currentPosition.latitude;
      const longitude = currentPosition.longitude;
      const newLatitude = latitude + (sliderValue * 0.009); // 0.009 est une valeur approximative pour convertir km en degrés
      const newLongitude = longitude + (sliderValue * 0.009);

      // Mettre à jour la localisation avec la nouvelle valeur
      const newLocation = { latitude: newLatitude, longitude: newLongitude };
      dispatch(addLocalisation(newLocation));
    }
  }, [sliderValue, currentPosition]);

  const handleChipPress = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips((selectedChips) =>
        selectedChips.filter((item) => item !== chip)
      );
    } else {
      setSelectedChips((selectedChips) => [...selectedChips, chip]);
    }
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderChip = (label) => {
    const isSelected = selectedChips.includes(label);
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

  const customTheme = {
    todayTextColor: "#EDFC92",
    arrowColor: "#EDFC92",
  };

  const applyFilter = () => {
    // Dispatch actions with the filter data
    dispatch(addQuantity(selectedChips));
    dispatch(addDate(selectedDate));
    // The newLocation is already stored in the state from the slider change
    // (assuming you dispatch the addLocalisation action in the useEffect hook)

    // Close the filter screen
    onClose();
  };

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
          <TouchableOpacity style={styles.btnAppliquer} onPress={applyFilter}>
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
