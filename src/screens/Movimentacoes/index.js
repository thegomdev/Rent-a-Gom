import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../firebaseConnection';
import { ref, get, push } from 'firebase/database';
import Toast from 'react-native-toast-message';

const Movimentacoes = () => {
    const navigation = useNavigation();

    const [matricula, setMatricula] = useState('');
    const [driver, setDriver] = useState('');
    const [localSaida, setLocalSaida] = useState('');
    const [localChegada, setLocalChegada] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [locais, setLocais] = useState([]);

    // Função para fechar o teclado.
    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Fecha o teclado.
    };

    // Carregar motoristas.
    async function loadDrivers() {
        const driversRef = ref(database, 'Drivers');
        const snapshot = await get(driversRef);
        if (snapshot.exists()) {
            setDrivers(Object.keys(snapshot.val()));
        } else {
            setDrivers([]);
        }
    }

    // Carregar locais.
    async function loadLocais() {
        const locaisRef = ref(database, 'Locais');
        const snapshot = await get(locaisRef);
        if (snapshot.exists()) {
            setLocais(Object.keys(snapshot.val()));
        } else {
            setLocais([]);
        }
    }

    useEffect(() => {
        loadDrivers();
        loadLocais();
    }, []);

    // Função para verificar se a matrícula existe no banco de dados.
    async function verificarMatricula() {
        const viaturaRef = ref(database, `Viaturas/${matricula.toUpperCase()}`); // Verifica a matrícula no banco de dados.

        const snapshot = await get(viaturaRef);
        if (!snapshot.exists()) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Matrícula não encontrada!',
                text2: 'Verifique a matrícula e tente novamente.',
                visibilityTime: 2000,
            });
            return false; // Retorna falso caso a matrícula não exista.
        }
        return true; // Retorna verdadeiro caso a matrícula exista.
    }

    // Função para salvar movimentação.
    async function handleSaveMovimentacao() {
        if (!matricula || !driver || !localSaida || !localChegada) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Preencha todos os campos!',
                visibilityTime: 1000,
            });
            return;
        }

        if (localSaida === localChegada) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'O local de saída e chegada não podem ser iguais.',
                visibilityTime: 1000,
            });
            return;
        }

        // Verificar se a matrícula existe antes de continuar.
        const matriculaValida = await verificarMatricula();
        if (!matriculaValida) return; // Se a matrícula não for válida, não prossegue com o salvamento.

        const movimentacaoRef = ref(database, `Movimentacoes/${matricula}`); // Ref para a matrícula.
        const motoristaRef = ref(database, `Motoristas/${driver}/${matricula}`); // Ref para o motorista.
        const agora = new Date();
        const dataHora = `${String(agora.getDate()).padStart(2, '0')}-${String(agora.getMonth() + 1).padStart(2, '0')}-${agora.getFullYear()} ${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;


        try {
            // Salvar a movimentação dentro da matrícula.
            await push(movimentacaoRef, {
                driver,
                localSaida,
                localChegada,
                dataHora,
            });

            // Salvar a matrícula dentro do nó do motorista.
            await push(motoristaRef, {
                matricula,
                localSaida,
                localChegada,
                dataHora,
            });

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Movimentação registrada com sucesso!',
                visibilityTime: 1000,
            });

            // Limpar os campos após salvar.
            setMatricula('');
            setDriver('');
            setLocalSaida('');
            setLocalChegada('');
        } catch (error) {
            console.error('Erro ao salvar movimentação:', error);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Não foi possível salvar a movimentação.',
                visibilityTime: 1000,
            });
        }
    }

    // Mapear os dados dos motoristas e locais para a estrutura necessária.
    const driverOptions = drivers.map((driver) => ({ key: driver, label: driver }));
    const localOptions = locais.map((local) => ({ key: local, label: local }));

    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <TouchableOpacity
                    style={styles.voltarTop}
                    onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={30} color={'#DBF227'} />
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={styles.main}>
                        <Text style={styles.title}>Movimentação</Text>

                        {/* Matrícula */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Matrícula do Veículo</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Matrícula"
                                value={matricula}
                                onChangeText={(text) => setMatricula(text.toUpperCase())}
                                maxLength={8}
                                placeholderTextColor="#FFF" />
                        </View>

                        {/* Motorista */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Motorista</Text>
                            <ModalSelector
                                data={driverOptions}  // Retira a opção 'Selecione um motorista'.
                                initValue={driver || "Selecione um motorista"} // Exibe o valor selecionado ou 'Selecione...'.
                                onChange={(option) => setDriver(option.label)} // Atualiza o estado com o motorista selecionado.
                                style={styles.selector} />
                        </View>

                        {/* Local de saída */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Local de Saída</Text>
                            <ModalSelector
                                data={localOptions}
                                initValue={localSaida || "Selecione o local de saída"}
                                onChange={(option) => setLocalSaida(option.label)}
                                style={styles.selector} />
                        </View>

                        {/* Local de chegada */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Local de Chegada</Text>
                            <ModalSelector
                                data={localOptions}
                                initValue={localChegada || "Selecione o local de chegada"}
                                onChange={(option) => setLocalChegada(option.label)}
                                style={styles.selector} />
                        </View>

                        {/* Botão */}
                        <TouchableOpacity style={styles.button} onPress={handleSaveMovimentacao}>
                            <Text style={styles.buttonText}>Salvar Movimentação</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#042940',
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

    main: {
        width: '100%',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFF',
    },

    inputGroup: {
        width: '80%',
        marginBottom: 20,
    },

    label: {
        marginBottom: 5,
        color: '#FFF',
    },

    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#FFF',
        borderColor: '#DBF227',
        backgroundColor: '#042940',
    },

    selector: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#FFF',
        borderColor: '#DBF227',
        backgroundColor: '#042940',
    },

    button: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#DBF227',
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#042940',
    },
});

export default Movimentacoes;
