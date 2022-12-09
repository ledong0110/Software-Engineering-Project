import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text, TextInput, View
} from 'react-native';
import Header from '../../components/Header';
import ContactList from '../../data/ContactList';

const Item = ({ item }) => {
	const navigation = useNavigation();

	return (
		<Pressable
			style={styles.contact}
			android_ripple={{ color: 'gray' }}
			onPress={() =>
				navigation.navigate('MessLine', {
					item,
				})
			}>
			<Image
				style={styles.avatar}
				source={require('../../assets/avatar.png')}
			/>
			<View style={styles.container}>
				<Text style={styles.user}>{item.name}</Text>
				<Text style={styles.text}>{item.preview}</Text>
			</View>
			<Text style={styles.time}>{item.time}</Text>
		</Pressable>
	);
};

const CONTACT_URL = '';

function ChatScreen(props) {
	const [contact, setContact] = useState([]);
	const [users, setUsers] = useState(ContactList);
	const navigation = useNavigation();

	const filterUser = (name) => {
		return ContactList.filter((user) => {
			if (name.length !== 0) {
				return user.name.includes(name);
			} else setUsers(ContactList);
		});
	};

	const handleChange = (e) => {
		let dt = filterUser(e);
		if (dt.length > 0) setUsers(dt);
		else return null;
	};

	return (
		<>
			<Header name='Trò chuyện' />
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Tìm kiếm'
					onChangeText={handleChange}
				/>
			</View>
			<FlatList
				style={styles.list}
				data={users}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Item item={item} />}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		height: 600,
	},
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
	},
	input: {
		width: '75%',
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 20,
		borderWidth: 1,
		paddingLeft: 10,
	},
	contact: {
		width: '100%',
		height: 100,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		borderTopWidth: 1,
		backgroundColor: '#d9d9d9',
	},
	avatar: {
		width: 48,
		height: 48,
		marginHorizontal: 15,
	},
	container: {
		width: '50%',
	},
	user: {
		fontSize: 20,
	},
	last: {
		fontSize: 12,
	},
	time: {
		marginLeft: 45,
	},
});

export default ChatScreen;
