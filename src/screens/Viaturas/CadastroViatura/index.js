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
                Marca: marca,
                Modelo: modelo,
                Matrícula: matricula,
                Ano: ano,
                Kms: kms,
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
                    <TouchableOpacity style={styles.voltarTop}
                        onPress={() => navigation.goBack()}>
                        <Feather name="corner-down-left" size={30} color={"#CB6040"} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scroll}>
                <View style={styles.main}>

                    <View>
                        <Text style={styles.titleCadastro}>Cadastro de viaturas</Text>
                    </View>


                    {/* Marca da viatura */}
                    <View style={styles.inputs}>
                        <Text>Marca</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Marca"
                            value={marca}
                            onChangeText={(text) => setMarca(text)}
                            maxLength={15}
                            placeholderTextColor="#FD8B51"
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
                            placeholderTextColor="#FD8B51"
                        />
                    </View>


                    {/* Matricula */}
                    <View style={styles.inputs}>
                        <Text>Matrícula</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Matrícula"
                            value={matricula}
                            onChangeText={(text) => setMatricula(text)}
                            maxLength={15}
                            placeholderTextColor="#FD8B51"
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
                            placeholderTextColor="#FD8B51"
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
                            placeholderTextColor="#FD8B51"
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
        width: '100%',
    },

    top: {
        backgroundColor: '#257180',
        width: '100%',
        height: '8%',
    },

    voltarTop: {
        marginTop: '38',
        marginLeft: 10,
    },

    scroll: {
        flex: 1,
        backgroundColor: '#F2E5BF',
        width: '100%',
    },

    titleCadastro: {
        marginBottom: 30,
        fontSize: 35,
        fontWeight: 'bold',
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
        borderWidth: 2,
        width: '30%',
        alignItems: 'center',
        height: 30,
        marginTop: 15,
        borderColor: '#CB6040',
        borderRadius: 6,
    },

    textCadastrar: {
        color: '#030d4f',
        marginTop: 6,
    },

});

export default CadastroViaturas;