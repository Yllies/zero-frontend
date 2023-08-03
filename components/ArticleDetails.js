import React from "react";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

export default function ArticleDetails() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (fontsLoaded) {
    return (
      <View onLayout={onLayoutRootView} style={styles.containerPage}>
        <TouchableOpacity style={styles.touch}>
          <Image
            style={styles.donationImage}
            source={require("../assets/don.png")}
            alt="don"
          />
          <Text
            style={{
              fontFamily: "MontserratBold",
              fontSize: 15,
              marginLeft: 10,
            }}
          >
            CHAUSSURES
          </Text>
          <Text style={{ fontFamily: "Poppins", fontSize: 15, marginLeft: 10 }}>
            10 paires
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    height: 230,
    backgroundColor: "#EDFC92",
    borderRadius: 5,
    width: 200,
  },

  donationImage: {
    width: 200,
    height: 130,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 15,
  },
});
