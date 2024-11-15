import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';

const Viaturas = () => {

    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View>
                    <Text>Viaturas</Text>
                </View>
            </View>



        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
    },

});

export default Viaturas;