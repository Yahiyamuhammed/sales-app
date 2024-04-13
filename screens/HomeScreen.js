import { View, Text, StyleSheet, Button } from "react-native";
// import Footer from './footer';
// import FooterScreen from './SettingsScreen';

export default function HomeScreen ({ navigation }) {
return (

    <View style={styles.container}>
        <Text style={styles.text}> HomeScreen
        </Text>
        <Button title="GoTo About" onPress={() => navigation.navigate('Add Sale')}></Button>
        {/* <Footer /> */}
        {/* <FooterScreen />  */}
        </View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
},
text: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 16,
},
});