import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, } from 'react-native';
import { database } from '../../../firebaseConnection';
import { ref, update, remove } from 'firebase/database';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const EditarViatura = ({ route, navigation }) => {
    const { viatura } = route.params;

    const [marca, setMarca] = useState(viatura.Marca || '');
    const [modelo, setModelo] = useState(viatura.Modelo || '');
    const [matricula, setMatricula] = useState(viatura.Matrícula || '');
    const [kms, setKms] = useState(viatura.Kms || '');
    const [ano, setAno] = useState(viatura.Ano || '');

    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Fecha o teclado.
    };

    const updateViatura = () => {
        // Verifica se todos os campos estão preenchidos antes de salvar.
        if (marca !== '' && modelo !== '' && matricula !== '' && ano !== '' && kms !== '') {
            // Define a referência para o registro específico da viatura no banco de dados.
            const viaturaRef = ref(database, `Viaturas/${viatura.id}`);
            update(viaturaRef, {
                Marca: marca,
                Modelo: modelo,
                Matrícula: matricula,
                Kms: kms,
                Ano: ano,
            });
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Viatura Atualizada!',
                visibilityTime: 1000,
            });

            navigation.goBack();

        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Preencha todos os campos!',
                text2: 'Todos os campos são obrigatórios.',
                visibilityTime: 2000,
            });
        }
    }



    // Função para remover a viatura do banco de dados.
    const deleteViatura = () => {
        // Define a referência para a viatura específica no banco de dados.
        const viaturaRef = ref(database, `Viaturas/${viatura.id}`);

        // Remove a viatura do banco de dados.
        remove(viaturaRef)
            .then(() => {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Viatura Excluída!',
                    visibilityTime: 1000,
                });

                navigation.goBack();
            })
            .catch(error => {
                console.error('Erro ao excluir viatura:', error);
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Erro ao excluir!',
                    text2: 'Por favor, tente novamente.',
                    visibilityTime: 2000,
                });
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <View style={styles.top}>
                <View>
                    <TouchableOpacity style={styles.voltarTop}
                        onPress={() => navigation.goBack()}>
                        <Feather name="corner-down-left" size={35} color={"#73EC8B"} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled">

                    <View style={styles.main}>
                        <View style={styles.form}>
                            <Text style={styles.text}>Marca:</Text>
                            <TextInput style={styles.input} value={marca} onChangeText={setMarca} />

                            <Text style={styles.text}>Modelo:</Text>
                            <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

                            <Text style={styles.text}>Matrícula:</Text>
                            <TextInput style={styles.input} value={matricula} onChangeText={setMatricula} />

                            <Text style={styles.text}>Km's:</Text>
                            <TextInput style={styles.input} value={kms} onChangeText={setKms} />

                            <Text style={styles.text}>Ano:</Text>
                            <TextInput style={styles.input} value={ano} onChangeText={setAno} />
                        </View>

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={updateViatura}>
                                <Text style={styles.buttonText}>Salvar Alterações</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonDelete} onPress={deleteViatura}>
                                <Text style={styles.buttonText}>Excluir Viatura</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </TouchableWithoutFeedback >

        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Centraliza o conteúdo verticalmente.
        width: '100%',
        backgroundColor: '#1C325B',
    },

    scroll: {
        flex: 1,
        backgroundColor: "#1C325B",
        width: "100%",
    },

    top: {
        backgroundColor: '#1C325B',
        width: '100%',
        height: '12%',
    },

    voltarTop: {
        marginTop: 40,
        marginLeft: 10,
    },

    main: {
        width: "80%",
        alignItems: "center", // Centraliza os itens no eixo horizontal.
        justifyContent: "center", // Garante alinhamento interno centralizado.
        borderRadius: 20,
        alignSelf: "center", // Centraliza o próprio main.
    },

    form: {
        width: '100%',
        alignItems: 'center'
    },

    text: {
        fontSize: 18,
        marginBottom: 5,
        color: '#FFF',
    },

    input: {
        borderWidth: 1,
        borderColor: '#73EC8B',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: '90%',
        color: '#FFF',
    },

    buttons: {
        width: '100%',
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#73EC8B',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        width: '60%',
    },

    buttonText: {
        color: '#1C325B',
        fontSize: 18,
    },

    buttonDelete: {
        backgroundColor: '#CB6040',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        width: '40%',
    },
});

export default EditarViatura;
