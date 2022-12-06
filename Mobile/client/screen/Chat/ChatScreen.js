import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
} from 'firebase/firestore';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
} from 'react-native';
import Header from '../../components/Header';
import ContactList from '../../data/ContactList';

const Item = ({ item }) => {
	// const [lastText, setLastText] = useState('');
	// const [lastTime, setLastTime] = useState('');

	// const uid = getAuth().currentUser.uid;
	// useEffect(() => {
	// 	const roomID =
	// 		item.id > uid ? item.id + '-' + uid : uid + '-' + item.id;
	// 	const roomRef = doc(getFirestore(), 'rooms', roomID);
	// 	getDoc(roomRef).then((doc) => {
	// 		if (doc.exists()) {
	// 			setLastText(doc.data().lastMessage.text);
	// 			setLastTime(doc.data().lastMessage.createdAt.seconds);
	// 		}
	// 	});
	// }, []);

	const navigation = useNavigation();

	// const date = new Date(time * 1000);
	// var hours = date.getHours();
	// var minutes = '0' + date.getMinutes();
	// const time = hours + ':' + minutes.slice(-2);
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
		else return null
	};
	// const auth = getAuth();
	// const db = getFirestore();
	// useEffect(() => {
	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			const uid = user.uid;
	// 			getDocs(collection(db, 'users')).then((querySnapshot) => {
	// 				const tempContact = [];
	// 				querySnapshot.forEach((doc) => {
	// 					if (doc.exists()) {
	// 						if (doc.id != uid) {
	// 							tempContact.push({
	// 								id: doc.id,
	// 								name: doc.data().name,
	// 								email: doc.data().email,
	// 							});
	// 						}
	// 					}
	// 				});
	// 				setContact(tempContact);
	// 			});
	// 		}
	// 	});
	// }, []);
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
