import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Header from '../../components/Header';

const Item = ({ item }) => {
	const [lastText, setLastText] = useState('');
	const [lastTime, setLastTime] = useState('');

	const uid = getAuth().currentUser.uid;
	const navigation = useNavigation();
	useEffect(() => {
		const roomID =
			item.id > uid ? item.id + '-' + uid : uid + '-' + item.id;
		const roomRef = doc(getFirestore(), 'rooms', roomID);
		getDoc(roomRef).then((doc) => {
			if (doc.exists()) {
				setLastText(doc.data().lastMessage.text);
				setLastTime(doc.data().lastMessage.createdAt.seconds);
			}
		});
	}, []);

	const date = new Date(lastTime * 1000);

	var hours = date.getHours();
	var minutes = '0' + date.getMinutes();
	const time = hours + ':' + minutes.slice(-2);
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
				<Text style={styles.text}>{lastText}</Text>
			</View>
			<Text style={styles.time}>{time}</Text>
		</Pressable>
	);
};

function ChatScreen(props) {
	const [contact, setContact] = useState([]);
	const navigation = useNavigation();
	const auth = getAuth();
	const db = getFirestore();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				getDocs(collection(db, 'users')).then((querySnapshot) => {
					const tempContact = [];
					querySnapshot.forEach((doc) => {
						if (doc.exists()) {
							if (doc.id != uid) {
								tempContact.push({
									id: doc.id,
									name: doc.data().name,
									email: doc.data().email,
								});
							}
						}
					});
					setContact(tempContact);
				});
			}
		});
	}, []);
	return (
		<>
			<Header name='Trò chuyện' />
			<FlatList
				style={styles.list}
				data={contact}
				keyExtractor={(item) => item.email}
				renderItem={({ item }) => <Item item={item} />}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		height: 600,
		marginTop: 30,
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
