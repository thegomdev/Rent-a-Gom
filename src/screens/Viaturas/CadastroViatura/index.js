import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform,
} from "react-native";
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
                                maxLength={15}
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
                                maxLength={15}
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
                                maxLength={15}
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
                                maxLength={15}
                                placeholderTextColor='#FFF'
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Kms */}
                        <View style={styles.inputs}>
                            <Text style={styles.titleInput}>Kms</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Kms"
                                value={kms}
                                onChangeText={(text) => setKms(text)}
                                maxLength={15}
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
        alignItems: "center",
        justifyContent: "center", // Centraliza o conteúdo verticalmente.
        width: "100%",
        backgroundColor: "#1C325B",
    },

    top: {
        width: "100%",
        height: "8%",
        marginBottom: 20,
    },

    voltarTop: {
        marginTop: 38,
        marginLeft: 10,
    },

    scroll: {
        flex: 1,
        backgroundColor: "#1C325B",
        width: "100%",
    },

    titleCadastro: {
        marginBottom: 30,
        fontSize: 35,
        fontWeight: "bold",
        color: "#FFF",
    },

    main: {
        width: "80%",
        alignItems: "center", // Centraliza os itens no eixo horizontal.
        justifyContent: "center", // Garante alinhamento interno centralizado.
        borderRadius: 20,
        alignSelf: "center", // Centraliza o próprio main.
    },

    titleInput: {
        color: '#FFF',
    },

    inputs: {
        width: '100%',
        alignItems: 'center',
    },

    textInput: {
        borderWidth: 1,
        width: '90%',
        height: 30,
        marginBottom: 15,
        borderRadius: 5,
        padding: 20,
        borderColor: '#73EC8B',
    },

    botoes: {
        width: "100%",
        alignItems: "center",
    },

    button: {
        backgroundColor: "#73EC8B",
        width: "40%",
        alignItems: "center",
        height: 30,
        marginBottom: 15,
        borderRadius: 5,
    },

    textCadastrar: {
        color: "#1C325B",
        marginTop: 8,
        fontWeight: "bold",
    },
});

export default CadastroViaturas;
