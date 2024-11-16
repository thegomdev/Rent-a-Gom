import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { database } from '../../../firebaseConnection'; // Importando a connection.
import { ref, push, set } from 'firebase/database';  // Importando as funções do firebase.
import Toast from 'react-native-toast-message';

const CadastroViaturas = () => {
    const navigation = useNavigation();

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [matricula, setMatricula] = useState('');
    const [ano, setAno] = useState('');
    const [kms, setKms] = useState('');

    async function handleCadastro() {
        // Validando para nenhum campo ficar vazio.
        if (marca !== '' && modelo !== '' && matricula !== '' && ano !== '' && kms !== '') {
            

            // Referência para o nó 'Viaturas' no Realtime Database.
            const cadastroViaturaRef = ref(database, 'Viaturas');
            // Cria uma chave unica para cada viatura.
            const newCadastroViaturaRef = push(cadastroViaturaRef);

            // Salva os dados no Realtime Database, usa o set para armazenar dentro de cada key unica gerada.
            await set(newCadastroViaturaRef, {
                marca: marca,
                modelo: modelo,
                matricula: matricula,
                ano: ano,
                kms: kms,
            });

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Cadastro concluído!',
                visibilityTime: 1000,
            });

            // Limpa os campos apos rodar a função.
            setMarca('');
            setModelo('');
            setMatricula('');
            setKms('');
            setAno('');

            // Apos rodar a função e cadastrar, ele volta a pagina.
            navigation.goBack();


        } else {
            // Usando Toast para exibir mensagem de erro.
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Preencha todos os campos!',
                visibilityTime: 1000,
            });
        }
    }


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

            <ScrollView style={styles.scroll}>
                <View style={styles.main}>


                    {/* Marca da viatura */}
                    <View style={styles.inputs}>
                        <Text>Marca</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Marca"
                            value={marca}
                            onChangeText={(text) => setMarca(text)}
                            maxLength={15}
                            placeholderTextColor="#A020F0"
                        />
                    </View>


                    {/* Modelo da viatura */}
                    <View style={styles.inputs}>
                        <Text>Modelo</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Modelo"
                            value={modelo}
                            onChangeText={(text) => setModelo(text)}
                            maxLength={15}
                            placeholderTextColor="#A020F0"
                        />
                    </View>


                    {/* Matricula */}
                    <View style={styles.inputs}>
                        <Text>Matricula</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Matricula"
                            value={matricula}
                            onChangeText={(text) => setMatricula(text)}
                            maxLength={15}
                            placeholderTextColor="#A020F0"
                        />
                    </View>


                    {/* Ano da viatura */}
                    <View style={styles.inputs}>
                        <Text>Ano</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Ano"
                            value={ano}
                            onChangeText={(text) => setAno(text)}
                            maxLength={15}
                            placeholderTextColor="#A020F0"
                            keyboardType="numeric"
                        />
                    </View>


                    {/* Km's */}
                    <View style={styles.inputs}>
                        <Text>Kms</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Kms"
                            value={kms}
                            onChangeText={(text) => setKms(text)}
                            maxLength={15}
                            placeholderTextColor="#A020F0"
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Botão */}
                    <View style={styles.botoes}>
                        <TouchableOpacity onPress={handleCadastro} style={styles.button}>
                            <Text style={styles.textCadastrar}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            
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

    scroll: {
        flex: 1,
        backgroundColor: '#ffc52c',
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

    botoes: {
        width: '100%',
        alignItems: 'center',
    },

    button: {
        borderWidth: 1,
        width: '30%',
        alignItems: 'center',
        height: 30,
        marginTop: 15,
        borderColor: '#030d4f',
        borderRadius: 6,
    },

    textCadastrar: {
        color: '#030d4f',
        marginTop: 6,
    },

});

export default CadastroViaturas;