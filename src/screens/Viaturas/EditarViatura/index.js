import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, } from 'react-native';
import { database } from '../../../firebaseConnection';
import { ref, update, remove, set } from 'firebase/database';
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
        if (marca !== '' && modelo !== '' && matricula !== '' && ano !== '' && kms !== '') {
            // Verifica se a matrícula foi alterada.
            if (matricula !== viatura.Matrícula) {
                // Remove a viatura com a matrícula antiga.
                const viaturaRefOld = ref(database, `Viaturas/${viatura.Matrícula}`);
                remove(viaturaRefOld)
                    .then(() => {
                        // Adiciona a viatura com a nova matrícula como chave.
                        const viaturaRefNew = ref(database, `Viaturas/${matricula}`);
                        set(viaturaRefNew, {
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
                    })
                    .catch((error) => {
                        console.error('Erro ao remover a viatura antiga:', error);
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Erro ao atualizar!',
                            text2: 'Tente novamente.',
                            visibilityTime: 2000,
                        });
                    });
            } else {
                // Se a matrícula não foi alterada, apenas atualize os dados.
                const viaturaRef = ref(database, `Viaturas/${viatura.Matrícula}`);
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
            }
        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Preencha todos os campos!',
                text2: 'Todos os campos são obrigatórios.',
                visibilityTime: 2000,
            });
        }
    };



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
                        <Feather name="arrow-left" size={35} color={"#DBF227"} />
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
                            <TextInput
                                style={styles.input}
                                value={marca}
                                onChangeText={(text) => setMarca(text.toUpperCase())}
                                maxLength={9} />

                            <Text style={styles.text}>Modelo:</Text>
                            <TextInput
                                style={styles.input}
                                value={modelo}
                                onChangeText={(text) => setModelo(text.toUpperCase())}
                                maxLength={10} />

                            <Text style={styles.text}>Matrícula:</Text>
                            <TextInput
                                style={styles.input}
                                value={matricula}
                                onChangeText={(text) => setMatricula(text.toUpperCase())}
                                maxLength={8} />

                            <Text style={styles.text}>Km's:</Text>
                            <TextInput
                                style={styles.input}
                                value={kms}
                                onChangeText={setKms}
                                maxLength={7}
                                keyboardType="numeric" />

                            <Text style={styles.text}>Ano:</Text>
                            <TextInput
                                style={styles.input}
                                value={ano}
                                onChangeText={setAno}
                                maxLength={4}
                                keyboardType="numeric" />
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
        justifyContent: 'center', // Centraliza o conteúdo verticalmente.
        alignItems: 'center',
        backgroundColor: '#042940',
        width: '100%',
    },

    // Top Styles.
    top: {
        width: '100%',
        height: '12%',
        backgroundColor: '#042940',
    },

    scroll: {
        flex: 1,
        width: '100%',
        backgroundColor: '#042940',
    },

    voltarTop: {
        marginLeft: 10,
        marginTop: 40,
    },

    // Main Styles.
    main: {
        width: '80%',
        alignSelf: 'center', // Centraliza o próprio main.
        alignItems: 'center', // Centraliza os itens no eixo horizontal.
        justifyContent: 'center', // Garante alinhamento interno centralizado.
        borderRadius: 20,
    },

    form: {
        alignItems: 'center',
        width: '100%',
    },

    text: {
        fontSize: 18,
        marginBottom: 5,
        color: '#FFF',
    },

    input: {
        width: '90%',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: '#FFF',
        borderColor: '#DBF227',
    },

    // Buttons Styles.
    buttons: {
        width: '100%',
        alignItems: 'center',
    },

    button: {
        width: '60%',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#DBF227',
    },

    buttonText: {
        fontSize: 18,
        color: '#042940',
    },

    buttonDelete: {
        width: '40%',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#CB6040',
    },
});

export default EditarViatura;
