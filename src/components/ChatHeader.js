import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from "../config/constants";

const ChatHeader = ({ chatName }) => {

    return (
        <View
            style={styles.container}
        >
                <View style={styles.avatar}>
                    <Text style={styles.avatarLabel}>
                        {chatName.split(' ').reduce((prev, current) => `${prev}${current[0]}`, '')}
                    </Text>
                </View>

            <Text style={styles.chatName}>{chatName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: -30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    avatarLabel: {
        fontSize: 20,
        color: 'white'
    },
    chatName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default ChatHeader;
