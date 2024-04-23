import { Alert, Button, View } from "react-native";
import MyInput from "../../components/MyInput";
import styles from "./styles";
import React from "react";
import { rolesService } from "../../services/roles.service";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function AddRole() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    function create() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome é obrigatório')
            return
        }

        if (!description || description.trim().length < 1) {
            Alert.alert('Descrição é obrigatório')
            return
        }

        rolesService.create(name, description).then(result => {
            if (result === true) {
                setName('')
                setDescription('');
                navigation.goBack()
            } else {
                Alert.alert(result + '')
            }
        })
    }

    return (
        <View style={styles.container}>
            <MyInput title='Nome' value={name} change={setName} />
            <MyInput title='Description' value={description} change={setDescription} multiline={true} />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={create} />
            </View>

        </View>
    )
}