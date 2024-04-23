import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { AppState, Button, FlatList, View } from 'react-native'
import UserView from '../../components/UserView'
import { rolesService } from '../../services/roles.service'


export default function RolesPage() {
    const navigation = useNavigation<NavigationProp<any>>()

    const [refreshing, setRefreshing] = React.useState(false)
    const [roles, setRoles] = React.useState<any[]>([])

    React.useEffect(() => {
        navigation.setOptions({

            headerRight: () => (
                <>
                    <Button title='Add +' onPress={goToAddRole} />
                </>
            )
        })
        fetchRoles();
    }, [])


    const [appState, setAppState] = useState(AppState.currentState);


    async function fetchRoles() {
        setRefreshing(true)
        try {
            const list = await rolesService.get()
            console.log(list);
            if (list) setRoles(list)
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }

    function goToAddRole(): void {
        navigation.navigate('AddRole')
    }

    function editRole(id: number) {
        navigation.navigate('User', { id })
    }

    function removeRole(id: number) {

    }

    return (
        <View>
            <FlatList
                data={roles}
                refreshing={refreshing}
                onRefresh={fetchRoles}
                renderItem={({ item }) =>
                    <UserView user={item} edit={editRole} remove={removeRole} />
                }
            />
        </View>
    )

}




