import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import FavoriteScreen from "./screens/FavoriteScreen";
import AddScreen from "./screens/AddScreen";
import SearchBar from "./components/SearchBar";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from "./reducers/user";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Favoris") {
            iconName = "heart";
          } else if (route.name === "Ajout") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 55,
          backgroundColor: "#274539",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#EDFC92",
        tabBarInactiveTintColor: "#fff",

        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Favoris" component={FavoriteScreen} />
      <Tab.Screen name="Ajout" component={AddScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {

console.log("env", process.env.EXPO_PUBLIC_BACK_URL)
  const store = configureStore({
    reducer: { user },
   });

  return (
    
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
