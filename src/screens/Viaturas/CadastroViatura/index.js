import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { database } from "../../../firebaseConnection"; // Importando a connection.
import { ref, push, set } from "firebase/database"; // Importando as funções do firebase.
import Toast from "react-native-toast-message";

const CadastroViaturas = () => {
    const navigation = useNavigation();

    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [matricula, setMatricula] = useState("");
    const [ano, setAno] = useState("");
    const [kms, setKms] = useState("");

    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Fecha o teclado.
    };

    async function handleCadastro() {
        if (marca !== "" && modelo !== "" && matricula !== "" && ano !== "" && kms !== "") {
            const cadastroViaturaRef = ref(database, "Viaturas");
            const newCadastroViaturaRef = push(cadastroViaturaRef);

            await set(newCadastroViaturaRef, {
                Marca: marca,
                Modelo: modelo,
                Matrícula: matricula,
                Ano: ano,
                Kms: kms,
            });

            Toast.show({
                type: "success",
                position: "top",
                text1: "Cadastro concluído!",
                visibilityTime: 1000,
            });

            setMarca("");
            setModelo("");
            setMatricula("");
            setKms("");
            setAno("");

            navigation.goBack();
        } else {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Preencha todos os campos!",
                visibilityTime: 1000,
            });
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <View style={styles.top}>
                <TouchableOpacity
                    style={styles.voltarTop}
                    onPress={() => navigation.goBack()}>
                    <Feather name="corner-down-left" size={30} color={"#73EC8B"} />
                </TouchableOpacity>
            </View>


            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled">


                    <View style={styles.main}>
                        <Text style={styles.titleCadastro}>Cadastro de viaturas</Text>

                        {/* Marca */}
                        <View style={styles.inputs}>
                            <Text style={styles.titleInput}>Marca</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Marca"
                                value={marca}
                                onChangeText={(text) => setMarca(text)}
                                maxLength={10}
                                placeholderTextColor='#FFF'
                            />
                        </View>

                        {/* Modelo */}
                        <View style={styles.inputs}>
                            <Text style={styles.titleInput}>Modelo</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Modelo"
                                value={modelo}
                                onChangeText={(text) => setModelo(text)}
                                maxLength={10}
                                placeholderTextColor='#FFF'
                            />
                        </View>

                        {/* Matrícula */}
                        <View style={styles.inputs}>
                            <Text style={styles.titleInput}>Matrícula</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Matrícula"
                                value={matricula}
                                onChangeText={(text) => setMatricula(text)}
                                maxLength={9}
                                placeholderTextColor='#FFF'
                            />
                        </View>

                        {/* Ano */}
                        <View style={styles.inputs}>
                            <Text style={styles.titleInput}>Ano</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ano"
                                value={ano}
                                onChangeText={(text) => setAno(text)}
                                maxLength={4}
                                placeholderTextColor='#FFF'
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Kms */}
                        <View style={styles.inputs}>
                            <Text style={styles.titleInput}>Kms</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Kms"d
                                value={kms}
                                onChangeText={(text) => setKms(text)}
                                maxLength={7}
                                placeholderTextColor='#FFF'
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center', // Centraliza o conteúdo verticalmente.
        backgroundColor: '#1C325B',
    },

    // Top Styles.
    top: {
        width: '100%',
        height: '8%',
        marginBottom: 20,
    },

    voltarTop: {
        marginTop: 38,
        marginLeft: 10,
    },

    scroll: {
        width: '100%',
        flex: 1,
        backgroundColor: '#1C325B',
    },

    // Main Styles.
    titleCadastro: {
        fontWeight: 'bold',
        marginBottom: 30,
        fontSize: 35,
        color: '#FFF',
    },

    main: {
        width: '80%',
        alignItems: 'center', // Centraliza os itens no eixo horizontal.
        justifyContent: 'center', // Garante alinhamento interno centralizado.
        alignSelf: 'center', // Centraliza o próprio main.
        borderRadius: 20,
    },

    titleInput: {
        color: '#FFF',
    },

    inputs: {
        width: '100%',
        alignItems: 'center',
    },

    textInput: {
        width: '90%',
        borderWidth: 1,
        height: 40,
        marginBottom: 15,
        borderRadius: 5,
        padding: 10,
        borderColor: '#73EC8B',
        color: '#FFF',
    },

    botoes: {
        width: '100%',
        alignItems: 'center',
    },

    button: {
        width: '40%',
        alignItems: 'center',
        height: 30,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#73EC8B',
    },

    textCadastrar: {
        fontWeight: 'bold',
        marginTop: 8,
        color: '#1C325B',
    },
});

export default CadastroViaturas;
