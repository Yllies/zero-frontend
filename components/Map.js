import { useEffect, useState } from 'react';
import {StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
    const dispatch = useDispatch();
  
    const [currentPosition, setCurrentPosition] = useState(null);

  
    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
  
        if (status === 'granted') {
          Location.watchPositionAsync({ distanceInterval: 10000 },
            (location) => {
              setCurrentPosition(location.coords);
            });
        }
      })();
    }, []);
  
//   à faire en fetchant:
    // const markers = user.places.map((data, i) => {
    //   return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
    // });
  
    return (
      <View style={{ flex: 1 }}>
        <MapView initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }} mapType="standard" style={styles.map}>
          {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
          {/* {markers} */}
        </MapView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    map:{
height:200,
width:300,
    },

  });