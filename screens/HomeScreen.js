import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from "react-native";
import AddCharity from "../components/AddCharity";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
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
});
