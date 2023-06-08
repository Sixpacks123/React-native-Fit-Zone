import React, {useContext} from 'react';
import { View, Image, Text, Button } from 'react-native';
import {UserContext} from "../contexts/UserContext";
import {user} from "../service/service";

const ProfileScreen = () => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.info}>
                    <Text style={styles.name}>{userData.firstName}</Text>
                    <Text style={styles.username}>@johndoe</Text>
                    <Button title="Edit Profile" onPress={() => {}} />
                </View>
            </View>
            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Programmes</Text>
                    <Text style={styles.statValue}>1,234</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Following</Text>
                    <Text style={styles.statValue}>123</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Followers</Text>
                    <Text style={styles.statValue}>456</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: '#fff',
    },
    header: {
        marginTop:50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        marginLeft: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    username: {
        color: '#999',
        fontSize: 18,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        color: '#999',
        fontSize: 14,
    },
    statValue: {
        fontSize: 18,
    },
    bio: {
        padding: 20,
        fontSize: 16,
        color: '#333',
    },
};

export default ProfileScreen;