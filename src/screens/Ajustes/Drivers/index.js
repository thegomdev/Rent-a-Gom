import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Toast from "react-native-toast-message";
import { database } from "../../../firebaseConnection"; // Importando a connection.
import { ref, set, get, remove, } from "firebase/database";

const Drivers = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState("");
    const [drivers, setDrivers] = useState([]);

    // Função para fechar o teclado.
    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Fecha o teclado.
    };

    // Função para carregar os drivers cadastrados.
    async function loadDrivers() {
        const driversRef = ref(database, "Drivers");
        const snapshot = await get(driversRef);
        if (snapshot.exists()) {
            setDrivers(Object.keys(snapshot.val()));
        } else {
            setDrivers([]);
        }
    }

    useEffect(() => {
        loadDrivers();
    }, []);


    // Função para cadastrar drivers.
    async function handleCadastroDriver() {
        if (nome !== "") {
            const cadastroDriverRef = ref(database, `Drivers/${nome}`); // Usar o nome como key.

            try {
                // Verifica se o nome já existe no banco.
                const snapshot = await get(cadastroDriverRef);
                if (snapshot.exists()) {
                    Toast.show({
                        type: "error",
                        position: "top",
                        text1: "Nome já cadastrado!",
                        visibilityTime: 1000,
                    });
                    return;
                }

                // Caso não exista, salva os dados no banco.
                await set(cadastroDriverRef, {
                    Nome: nome,
                });

                Toast.show({
                    type: "success",
                    position: "top",
                    text1: "Cadastro concluído!",
                    visibilityTime: 1000,
                });

                setNome("");
                loadDrivers(); // Recarrega a lista de drivers.

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
    async function handleDeleteDriver(driverName) {
        Alert.alert(
            "Confirmação", // Título do alerta.
            `Deseja deletar o driver ${driverName}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel", // Define o botão de cancelar.
                },
                {
                    text: "Deletar",
                    style: "destructive", // Estiliza como botão de ação destrutiva.
                    onPress: async () => { // Função executada ao confirmar.
                        const driverRef = ref(database, `Drivers/${driverName}`);
                        try {
                            await remove(driverRef);
                            Toast.show({
                                type: "success",
                                position: "top",
                                text1: "Driver deletado com sucesso!",
                                visibilityTime: 1000,
                            });
                            loadDrivers(); // Recarrega a lista de drivers.
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
                        <Feather name="arrow-left" size={30} color={'#DBF227'} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={styles.main}>
                        <View style={styles.cadastrarDriver}>
                            <Text style={styles.titleInput}>Nome</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nome"
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                                maxLength={15}
                                placeholderTextColor='#FFF'
                            />
                        </View>

                        {/* Botão */}
                        <View style={styles.botoes}>
                            <TouchableOpacity onPress={handleCadastroDriver} style={styles.button}>
                                <Text style={styles.textCadastrar}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Lista de drivers */}
                    <View style={styles.driverList}>
                        <Text style={styles.listTitle}>Drivers Cadastrados:</Text>
                        <FlatList
                            data={drivers}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <View style={styles.driverItem}>
                                    <Text style={styles.driverText}>{item}</Text>
                                    <TouchableOpacity onPress={() => handleDeleteDriver(item)} style={styles.deleteButton}>
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
        backgroundColor: '#042940',
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

    cadastrarDriver: {
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
        borderColor: '#DBF227',
        color: '#FFF',
    },

    botoes: {
        width: '100%',
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#DBF227',
        width: '40%',
        alignItems: 'center',
        height: 30,
        marginBottom: 15,
        borderRadius: 5,
    },

    textCadastrar: {
        marginTop: 8,
        fontWeight: 'bold',
        color: '#042940',
    },

    // Lista Drivers.
    driverList: {
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

    driverItem: {
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

    driverText: {
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

export default Drivers;
