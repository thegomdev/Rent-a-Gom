import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { Feather } from '@expo/vector-icons';

const Viaturas = () => {
    const navigation = useNavigation();


    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View>
                    <TouchableOpacity style={styles.voltarTop}
                         onPress={() => navigation.navigate('Home')}>
                        <Feather name="home" size={30} color={"#000"} />
                    </TouchableOpacity>
                </View>

                <View>
                <TouchableOpacity style={styles.plusViatura}
                         onPress={() => navigation.navigate('CadastroViatura')}>
                        <Feather name="plus-circle" size={30} color={"#000"} />
                    </TouchableOpacity>
                </View>
            </View>



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

});

export default Viaturas;