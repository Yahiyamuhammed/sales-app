import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 

import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/about";
import SettingsScreen from "./screens/SettingsScreen";
import TestScreen from "./screens/test";
// import FooterScreen from './FooterScreen'; // Import FooterScreen

// import HomeScreen from "../HelloWorld/screens/HomeScreen" ; 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
return (
<NavigationContainer>
{/* <Stack.Navigator>
 
<Stack.Screen name="Home" component={HomeScreen} />
 
<Stack.Screen name="About" component={AboutScreen} />
<Stack.Screen name="Footer" component={FooterScreen} />

</Stack.Navigator> */}

<Tab.Navigator
      initialRouteName="Add Sale"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {  
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Add Sale") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            // Return Ionicons component with the appropriate icon name
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        
        
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            tabBarStyle: [
            {
              display: "flex"
            },
            null
          ]
        })}
        
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Sale" component={AboutScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="test" component={TestScreen} />
      </Tab.Navigator>
</NavigationContainer>
);
}