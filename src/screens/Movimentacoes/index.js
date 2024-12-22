import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Movimentacoes = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

        <View style={styles.top}>
            <View style={styles.voltar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="corner-down-left" size={25} color={'#73EC8B'} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.main}>
            <Text>Movimentação</Text>

            <View>
                <Text>Viatura</Text>
            </View>

            <View>
                <Text>Driver</Text>
            </View>

            <View>
                <Text>Local saida</Text>
            </View>

            <View>
                <Text>Local chegada</Text>
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

  // Estilos do top.
  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    height: '10%'
},

voltar: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 10,
},

});

export default Movimentacoes;
