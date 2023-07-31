import { StyleSheet, View, Image, Text } from "react-native";

export default function FavoriteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favoris</Text>
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
