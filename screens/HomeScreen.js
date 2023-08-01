import { StyleSheet, View, Image, Text } from "react-native";
import AddCharity from "../components/AddCharity";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accueil</Text>
      <AddCharity/>
      <AddCharity/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});