import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './../screens/Home';
import Accueil from '../screens/acceuil';
import traduction from '../screens/traduction';
import Connexion from '../screens/connexion';
import Inscription from '../screens/inscription';
import Welcome from '../screens/welcome';
import Decouverte from '../screens/decouverte';
import Lecon from '../screens/lecon';
import LessonDetail from '../screens/lessonDetail';
import Chatbot from '../screens/chatbot';


const Routes = () => {
const Stack = createNativeStackNavigator();
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='welcome'>
          <Stack.Screen name="welcome" component={Welcome} options={{headerShown: false}} />
          <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="accueil" component={Accueil} options={{headerShown: false}}/>
          <Stack.Screen name="connexion" component={Connexion} options={{headerShown: false}}/>
          <Stack.Screen name="inscription" component={Inscription} options={{headerShown: false}}/>
          <Stack.Screen name="traduction" component={traduction} options={{headerShown: false}} />
          <Stack.Screen name="decouverte" component={Decouverte} options={{headerShown: false}} />
          <Stack.Screen name="lecon" component={Lecon} options={{headerShown: false}} />
          <Stack.Screen name="lessonDetail" component={LessonDetail} options={{headerShown: false}} />
          <Stack.Screen name="chatbot" component={Chatbot} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Routes
