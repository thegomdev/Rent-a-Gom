import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons';
import { database } from '../../firebaseConnection'; // Importando a connection.
import { ref, onValue } from 'firebase/database';

const Viaturas = () => {
    const navigation = useNavigation();

    const [viaturas, setViaturas] = useState([]); // Estado para listar as viaturas.
    const [searchQuery, setSearchQuery] = useState(''); // Estado para o texto de busca.



    // Listar viaturas com base na pesquisa.
    const filteredViaturas = viaturas.filter(item => {
        // Verifica se cada propriedade existe antes de chamar toLowerCase.
        const matricula = item.Matrícula ? item.Matrícula.toLowerCase() : '';
        const modelo = item.Modelo ? item.Modelo.toLowerCase() : '';
        const km = item.Kms ? item.Kms.toLowerCase() : '';
        const ano = item.Ano ? item.Ano.toLowerCase() : '';
        const marca = item.Marca ? item.Marca.toLowerCase() : '';

        return matricula.includes(searchQuery.toLowerCase()) ||
            modelo.includes(searchQuery.toLowerCase()) ||
            km.includes(searchQuery.toLowerCase()) ||
            marca.includes(searchQuery.toLowerCase()) ||
            ano.includes(searchQuery.toLowerCase());
    });



    // useEffect para exibir lista das viaturas ja cadastradas.
    useEffect(() => {
        // Referência ao nó "viaturas" no Realtime Database.
        const viaturasRef = ref(database, 'Viaturas');

        // Observa as mudanças no nó "viaturas".
        onValue(viaturasRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Transforma os dados em uma lista de viaturas.
                const viaturasList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setViaturas(viaturasList);
            } else {
                setViaturas([]);
            }
        });

    }, []);


    return (
        <View style={styles.container}>

            <View style={styles.top}>

                <View style={styles.voltar}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Feather name="corner-down-left" size={25} color={'#73EC8B'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.search}>
                    <Feather name="search" size={20} color={'#73EC8B'} />
                    <TextInput
                        style={styles.search2}
                        placeholder="Pesquisar"
                        placeholderTextColor="#FFF"
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)} // Atualiza o texto de pesquisa.
                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.plusViatura}
                        onPress={() => navigation.navigate('CadastroViatura')}>
                        <Feather name="plus-circle" size={30} color={"#73EC8B"} />
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.listViaturas}>
                {/* Exibir a lista de viaturas */}
                <FlatList
                    style={styles.flatEdit}
                    data={filteredViaturas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.viaturaItem}
                            onPress={() => navigation.navigate('EditarViatura', { viatura: item })}
                        >
                            <Text style={styles.viaturaText}>Marca: {item.Marca}</Text>
                            <Text style={styles.viaturaText}>Modelo: {item.Modelo}</Text>
                            <Text style={styles.viaturaText}>Matrícula: {item.Matrícula}</Text>
                            <Text style={styles.viaturaText}>Km's: {item.Kms}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

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
        marginTop: 35,
        marginLeft: 10,
    },

    search2: {
        marginLeft: 10,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: 10,
        borderWidth: 1,
        width: '70%',
        backgroundColor: '#1C325B',
        padding: 5,
        marginTop: 35,
        borderColor: '#73EC8B',
    },

    plusViatura: {
        marginTop: 35,
        marginRight: 10,
    },

    // Estilos da lista.
    listViaturas: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    flatEdit: {
        width: '80%',
    },

    viaturaItem: {
        backgroundColor: '#FFF',
        width: '100%',
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
    },

    viaturaText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C325B'
    },

});

export default Viaturas;