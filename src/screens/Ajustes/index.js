import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Ajustes = () => {
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
                <Text style={styles.titleAjustes}>Ajustes</Text>

                <View style={styles.bottons}>

                    <View style={styles.viewButtons}>
                        <View style={styles.viewButtons}>
                            <TouchableOpacity style={styles.buttonSingle} onPress={() => navigation.navigate('Drivers')}>
                                <Text style={styles.textButtons}>Drivers</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.viewButtons}>
                            <TouchableOpacity style={styles.buttonSingle} onPress={() => navigation.navigate('Locais')}>
                                <Text style={styles.textButtons}>Locais</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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

    // Estilos do main.
    main: {
        width: '100%',
        alignItems: 'center',
    },

    titleAjustes: {
        marginBottom: 30,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFF',
    },

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
        backgroundColor: '#73EC8B',
        borderRadius: 15,
        height: 60,
        marginBottom: 15,
    },

    textButtons: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 15,
    },

});

export default Ajustes;
