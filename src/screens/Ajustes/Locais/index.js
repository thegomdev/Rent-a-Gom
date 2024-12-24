import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Toast from "react-native-toast-message";
import { database } from "../../../firebaseConnection"; // Importando a connection.
import { ref, set, get, remove, } from "firebase/database";

const Locais = () => {
    const navigation = useNavigation();
    const [local, setLocal] = useState("");
    const [locais, setLocais] = useState([]);

    // Função para fechar o teclado.
    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Fecha o teclado.
    };

    // Função para carregar os locais cadastrados.
    async function loadLocais() {
        const locaisRef = ref(database, "Locais");
        const snapshot = await get(locaisRef);
        if (snapshot.exists()) {
            setLocais(Object.keys(snapshot.val()));
        } else {
            setLocais([]);
        }
    }

    useEffect(() => {
        loadLocais();
    }, []);


    // Função para cadastrar locais.
    async function handleCadastroLocal() {
        if (local !== "") {
            const cadastroLocalRef = ref(database, `Locais/${local}`); // Usar nome do local como key.

            try {
                // Verifica se o nome do local já existe no banco.
                const snapshot = await get(cadastroLocalRef);
                if (snapshot.exists()) {
                    Toast.show({
                        type: "error",
                        position: "top",
                        text1: "Local já cadastrado!",
                        visibilityTime: 1000,
                    });
                    return;
                }

                // Caso não exista, salva os dados no banco.
                await set(cadastroLocalRef, {
                    Local: local,
                });

                Toast.show({
                    type: "success",
                    position: "top",
                    text1: "Cadastro concluído!",
                    visibilityTime: 1000,
                });

                setLocal("");
                loadLocais();// Recarrega a lista de locais.

            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: "Erro ao cadastrar. Tente novamente.",
                    visibilityTime: 1000,
                });
                console.error("Erro ao salvar no banco:", error);
            }
        } else {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Preencha todos os campos!",
                visibilityTime: 1000,
            });
        }
    }


    // Função para deletar driver.
    async function handleDeleteLocal(LocaisLocal) {
        Alert.alert(
            "Confirmação", // Título do alerta.
            `Deseja deletar o local ${LocaisLocal}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel", // Define o botão de cancelar.
                },
                {
                    text: "Deletar",
                    style: "destructive", // Estiliza como botão de ação destrutiva.
                    onPress: async () => { // Função executada ao confirmar.
                        const locaisRef = ref(database, `Locais/${LocaisLocal}`);
                        try {
                            await remove(locaisRef);
                            Toast.show({
                                type: "success",
                                position: "top",
                                text1: "Local deletado com sucesso!",
                                visibilityTime: 1000,
                            });
                            loadLocais(); // Recarrega a lista de locais.
                        } catch (error) {
                            Toast.show({
                                type: "error",
                                position: "top",
                                text1: "Erro ao deletar. Tente novamente.",
                                visibilityTime: 1000,
                            });
                            console.error("Erro ao deletar do banco:", error);
                        }
                    },
                },
            ],
            { cancelable: true } // Permite cancelar o alerta clicando fora.
        );
    }


    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View style={styles.voltar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="corner-down-left" size={25} color={'#73EC8B'} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={{ flex: 1, width: '100%'}}>
                    <View style={styles.main}>
                        <View style={styles.cadastrarLocal}>
                            <Text style={styles.titleInput}>Nome do local</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Local"
                                value={local}
                                onChangeText={(text) => setLocal(text)}
                                maxLength={15}
                                placeholderTextColor='#FFF'
                            />
                        </View>

                        {/* Botão */}
                        <View style={styles.botoes}>
                            <TouchableOpacity onPress={handleCadastroLocal} style={styles.button}>
                                <Text style={styles.textCadastrar}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Lista de drivers */}
                    <View style={styles.locaisList}>
                        <Text style={styles.listTitle}>Locais Cadastrados:</Text>
                        <FlatList
                            data={locais}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <View style={styles.locaisItem}>
                                    <Text style={styles.locaisText}>{item}</Text>
                                    <TouchableOpacity onPress={() => handleDeleteLocal(item)} style={styles.deleteButton}>
                                        <Feather name="trash" size={20} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            )} />
                    </View>
                </View>
            </TouchableWithoutFeedback>

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

    main: {
        width: '80%',
        alignItems: 'center', // Centraliza os itens no eixo horizontal.
        justifyContent: 'center', // Garante alinhamento interno centralizado.
        borderRadius: 20,
        alignSelf: 'center', // Centraliza o próprio main.
    },

    cadastrarLocal: {
        width: '100%',
        alignItems: 'center',
    },

    titleInput: {
        color: '#FFF',
    },

    textInput: {
        borderWidth: 1,
        width: '90%',
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
        backgroundColor: '#73EC8B',
        width: '40%',
        alignItems: 'center',
        height: 30,
        marginBottom: 15,
        borderRadius: 5,
    },

    textCadastrar: {
        color: '#1C325B',
        marginTop: 8,
        fontWeight: 'bold',
    },

    // Lista Locais.
    locaisList: {
        flex: 1, // Expande para ocupar o espaço disponível.
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },

    listTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#FFF',
    },

    locaisItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center', // Centraliza cada item na lista.
        width: '90%',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#FFF',
    },

    locaisText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C325B',
    },

    deleteButton: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#E63946',
    },

});

export default Locais;
