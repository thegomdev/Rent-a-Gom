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

        <View style={styles.viewViaturas}>
          <TouchableOpacity style={styles.viaturas} onPress={() => navigation.navigate('Viaturas')}>
            <Text style={styles.textViaturas}>Viaturas</Text>
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

  top: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 30,
  },

  text1: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFF',
  },

  bottons: {
    width: '100%',
    alignItems: 'center',
  },

  viewViaturas: {
    width: '100%',
    alignItems: 'center'
  },

  viaturas: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#73EC8B',
    borderRadius: 15,
    height: 60,
  },

  textViaturas: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 13,
  },

});

export default Home;
