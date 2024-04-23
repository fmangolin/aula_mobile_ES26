import { TouchableOpacity, View, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import styles from "./styles";
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
    data: any,
    change: (value: any) => void
    value: any
}

export default function MultiSelectComponent(props: Props) {
    const [selected, setSelected] = useState([]);

    const renderItem = (item: { label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={props.data}
                labelField="label"
                valueField="label"
                placeholder="Select item"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={item => {

                    setSelected(item);
                    props.change(item)

                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color="black" name="delete" size={17} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};


