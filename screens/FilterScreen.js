import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


export default function FilterScreen({navigation}) {

  // Slider de localisation 

  const [sliderValue, setSliderValue] = useState(50);

  const onSliderValueChange = (value) => {
    setSliderValue(value);
  };

  // selection des filtres "chips"

  const [selectedChips, setSelectedChips] = useState([]);

  
  const handleChipPress = (chip) => {
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.includes(chip)
        ? prevSelectedChips.filter((item) => item !== chip)
        : [...prevSelectedChips, chip]
    );
  };

  const renderChip = (chip) => {
  const isSelected = selectedChips.includes(chip);


    return (
      <TouchableOpacity
        key={chip}
        onPress={() => handleChipPress(chip)}
        style={[styles.chip, isSelected ? styles.selectedChip : null]}
      >
        <Text style={[styles.chipText, isSelected ? styles.selectedChipText : null]}>
          {chip}
        </Text>
      </TouchableOpacity>
    );
  };


  // Calendrier

  const [selectedDate, setSelectedDate] = useState('');
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };


  // Changez la couleur du jour actuel + flèches de navigation en vert
  const customTheme = {
    todayTextColor: '#EDFC92', 
    arrowColor: '#EDFC92', 
  };


  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>


    <View contentContainerStyle={styles.container}>

<View style={styles.containerTitle}> 
<Text style={styles.Title}>Filtres</Text>
<FontAwesome  onPress={() => navigation.navigate("Accueil")}
 style={styles.iconeFilter}name="close" size={28} color="#274539"/>
</View>


<Text style={styles.subTitle}>Quantité</Text>
<View style={styles.containerChips}>
    {renderChip('1 article')}
    {renderChip('Moins de 5 articles')}
    {renderChip('moins de 10 articles')}
    {renderChip('Lot de 10 à 50')}
    {renderChip('Lot de 50 à 1OO')}
    {renderChip('Plus de 150')}
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
              [selectedDate]: { selected: true, selectedColor: '#274539' }, // date sélectionnée en vert
            }}
            theme={customTheme} // Utiliser le thème personnalisé pour modifier les couleurs du calendrier
          />
    </View>
     </View>

     </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  containerTitle : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:'10%',
    paddingLeft:'5%',
    paddingRight:'5%',
  },

  Title : {
    fontSize:30,
    fontWeight:'bold',
    color: "black",
    fontSize: 30,
  },

  subTitle : {
    fontFamily: "Poppins",
    color: "black",
    fontSize: 15,
    paddingLeft:'7%',
    paddingTop:'10%',
    paddingBottom:'3%',
  },

  
  containerSlider: {
    alignItems: 'flex-start', 
    justifyContent: 'center',
    paddingLeft:'2%',
    paddingBottom:'2%'
  },

  text: {
    paddingTop:'3%',
    fontSize: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#274539',
  },

  slider: {
    width: '90%',
  },

  containerChips : {
    paddingLeft:'4%',
    flexDirection: 'row', // Chips à l'horizontal
    flexWrap: 'wrap', // Faire passer les chips à la ligne si besoin
    alignItems: 'center', 
    justifyContent: 'flex-start', // Aligner les chips à gauche
    paddingBottom:'2%'
  },

  chip: {
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#EDFC92',
  },

  selectedChip: {
    backgroundColor: '#274539'
  },

  chipText: {
    fontSize: 15,
    color: '#274539',
  },

  selectedChipText: {
    color: 'white',
  },

  containerCalendrier: {
    width: '90%',
    justifyContent: 'flex-start',
    paddingTop:'2%',
    paddingLeft:'6%',
    paddingBottom:'12%',
  },
});

