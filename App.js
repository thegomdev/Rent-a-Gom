import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

// Home
import Home from './src/screens/Home';

// Viaturas
import Viaturas from './src/screens/Viaturas';
import CadastroViatura from './src/screens/Viaturas/CadastroViatura';
import EditarViatura from './src/screens/Viaturas/EditarViatura';

// Movimentações
import Movimentacoes from './src/screens/Movimentacoes';

// Ajustes
import Ajustes from './src/screens/Ajustes';
import Drivers from './src/screens/Ajustes/Drivers';
import Locais from './src/screens/Ajustes/Locais';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>


        {/* Tela Home */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        {/* Tela Viaturas */}
        <Stack.Screen
          name="Viaturas"
          component={Viaturas}
          options={{
            headerShown: false,
          }}
        />

        {/* Tela Cadastro Viatura */}
        <Stack.Screen
          name="CadastroViatura"
          component={CadastroViatura}
          options={{
            headerShown: false,
          }}
        />

        {/* Tela Editar Viatura */}
        <Stack.Screen
          name="EditarViatura"
          component={EditarViatura}
          options={{
            headerShown: false,
          }}
        />

        {/* Tela Movimentações */}
        <Stack.Screen
          name="Movimentacoes"
          component={Movimentacoes}
          options={
            {
              headerShown: false,
            }}
        />

        {/* Tela Ajustes */}
        <Stack.Screen
          name="Ajustes"
          component={Ajustes}
          options={
            {
              headerShown: false,
            }}
        />

        {/* Tela Drivers */}
        <Stack.Screen
          name="Drivers"
          component={Drivers}
          options={
            {
              headerShown: false,
            }}
        />

        {/* Tela Locais */}
        <Stack.Screen
          name="Locais"
          component={Locais}
          options={
            {
              headerShown: false,
            }}
        />



      </Stack.Navigator>

      {/* Toast para exibir notificações */}
      <Toast />
    </NavigationContainer>
  );
};

export default App;
