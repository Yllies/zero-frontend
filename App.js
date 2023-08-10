import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ScreenPostCompany from "./screens/AddCompanyScreen";
import PostsInWaitingScreen from "./screens/PostsInWaitingScreen";
import HomeCharityScreen from "./screens/HomeCharityScreen";
import HomeCompanyScreen from "./screens/HomeCompanyScreen";
import LoginScreen from "./screens/LoginScreen";
import FilterScreen from "./screens/FilterScreen";
import PostsPublishedScreen from "./screens/PostsPublishedScreen";
import SignUpScreen from "./screens/SignUpScreen";
import EditPostScreen from "./screens/EditPostScreen";
import NeedScreen from "./screens/NeedScreen";
import DonnationScreen from "./screens/DonnationScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import post from "./reducers/post";
import DetailsAuthor from "./screens/AuthorDetailsScreen";
import filter from "./reducers/filter";
import { useFonts } from "expo-font";
import AccountScreen from "./screens/AccountScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import HomeCharityScreenBeta from "./screens/HomeCharityScreenBeta";
import FilterScreenBeta from "./screens/FilterScreenBeta";

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
          } else if (route.name === "Publier") {
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
      <Tab.Screen name="Accueil" component={HomeCharityScreen} />
      <Tab.Screen name="Favoris" component={HomeCompanyScreen} />
      <Tab.Screen name="Publier" component={ScreenPostCompany} />
      <Tab.Screen name="Profile" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const store = configureStore({
    reducer: { user, filter, post },
  });

  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="EditPost" component={EditPostScreen} />
            <Stack.Screen name="DonnationScreen" component={DonnationScreen} />
            <Stack.Screen name="NeedScreen" component={NeedScreen} />
            <Stack.Screen name="DetailsAuthor" component={DetailsAuthor} />

            <Stack.Screen
              name="PostsInWaiting"
              component={PostsInWaitingScreen}
            />

            <Stack.Screen
              name="PostsPublished"
              component={PostsPublishedScreen}
            />
            <Stack.Screen name="Accueil" component={HomeCharityScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
