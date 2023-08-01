import { StyleSheet, View, Image, Text } from "react-native";
import AddCharity from "../components/AddCharity";
import Header from "../components/Header";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <AddCharity />
      <AddCharity />
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
