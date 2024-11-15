import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

const CadastroViaturas = () => {
    const navigation = useNavigation();
    const [marca] = useState("");
    const [modelo] = useState("");
    const [matricula] = useState("");
    const [kms] = useState("");

    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View>
                    <View>
                        <TouchableOpacity style={styles.voltarTop}
                            onPress={() => navigation.navigate('Home')}>
                            <Feather name="home" size={30} color={"#000"} />
                        </TouchableOpacity>
                    </View>
                    <Text>Cadastro</Text>
                </View>
            </View>

            <View style={styles.main}>

                <View style={styles.inputs}>
                    <Text>Marca</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Marca"
                        value={marca}
                        onChangeText={(text) => setValor1(text)}
                        maxLength={15}
                        placeholderTextColor="#A020F0"
                    />
                </View>

                <View style={styles.inputs}>
                    <Text>Modelo</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Marca"
                        value={modelo}
                        onChangeText={(text) => setValor1(text)}
                        maxLength={15}
                        placeholderTextColor="#A020F0"
                    />
                </View>

                <View style={styles.inputs}>
                    <Text>Matricula</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Matricula"
                        value={matricula}
                        onChangeText={(text) => setValor1(text)}
                        maxLength={15}
                        placeholderTextColor="#A020F0"
                    />
                </View>

                <View style={styles.inputs}>
                    <Text>Kms</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Kms"
                        value={kms}
                        onChangeText={(text) => setValor1(text)}
                        maxLength={15}
                        placeholderTextColor="#A020F0"
                        keyboardType="numeric"
                    />
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

    main: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
    },

    inputs: {
        width: '100%',
        alignItems: 'center',
    },

    textInput: {
        borderWidth: 1,
        width: '40%',
        height: 30,
        marginBottom: 20,
    },

});

export default CadastroViaturas;