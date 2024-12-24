import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>


      <View style={styles.top}>
        <Text style={styles.text1}>Rent a Gom</Text>
      </View>

      <View style={styles.bottons}>

        {/* Button Viaturas */}
        <View style={styles.viewButtons}>
          <TouchableOpacity style={styles.buttonSingle} onPress={() => navigation.navigate('Viaturas')}>
            <Text style={styles.textButtons}>Viaturas</Text>
          </TouchableOpacity>
        </View>

        {/* Button Movimentações */}
        <View style={styles.viewButtons}>
          <TouchableOpacity style={styles.buttonSingle} onPress={() => navigation.navigate('Movimentacoes')}>
            <Text style={styles.textButtons}>Movimentações</Text>
          </TouchableOpacity>
        </View>

        {/* Button Ajustes */}
        <View style={styles.viewButtons}>
          <TouchableOpacity style={styles.buttonSingle} onPress={() => navigation.navigate('Ajustes')}>
            <Text style={styles.textButtons}>Ajustes</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1C325B',
  },

  // Top Styles.
  top: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 30,
  },

  text1: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#FFF',
  },

  // Bottons Styles.
  bottons: {
    width: '100%',
    alignItems: 'center',
  },

  viewButtons: {
    width: '100%',
    alignItems: 'center'
  },

  buttonSingle: {
    width: '50%',
    alignItems: 'center',
    borderRadius: 15,
    height: 60,
    marginBottom: 15,
    backgroundColor: '#73EC8B',
  },

  textButtons: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFF',
    marginTop: 15,
  },

});

export default Home;
