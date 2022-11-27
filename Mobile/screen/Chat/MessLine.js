import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import {
	addDoc,
	collection,
	getFirestore,
	onSnapshot,
	orderBy,
	query,
	doc,
	setDoc,
	getDoc,
} from 'firebase/firestore';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MessLine({ route }) {
	const { item } = route.params;
	const [userName, setUserName] = useState('');
	const [messages, setMessages] = useState([]);
	const userB = item;
	const navigation = useNavigation();
	const currentUser = getAuth().currentUser;
	const uid = currentUser.uid;
	const db = getFirestore();
	const roomID = item.id > uid ? item.id + '-' + uid : uid + '-' + item.id;
	const roomRef = doc(db, 'rooms', roomID);
	const roomMessageRef = collection(db, 'rooms', roomID, 'messages');

	useEffect(() => {
		const q = query(roomMessageRef, orderBy('createdAt', 'desc'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			setMessages(
				snapshot.docs.map((doc) => ({
					_id: doc.id,
					text: doc.data().text,
					createdAt: doc.data().createdAt.toDate(),
					user: doc.data().user,
				}))
			);
		});
		getDoc(doc(db, 'users', uid)).then((doc) => {
			if (doc.id === uid) {
				setUserName(doc.data().name);
			}
		});

		return unsubscribe;
	}, []);

	const currUserData = {
		displayName: userName,
		email: currentUser.email,
	};
	const userBData = {
		displayName: userB.name,
		email: userB.email,
	};
	const roomData = {
		participants: [currUserData, userBData],
		participantsArray: [currentUser.email, userB.email],
	};
	setDoc(roomRef, roomData, {merge: true});
	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
		if (messages) {
			const { _id, createdAt, text, user } = messages[0];
			addDoc(roomMessageRef, {
				_id,
				createdAt,
				text,
				user,
			});
			setDoc(
				roomRef,
				{
					lastMessage: {
						_id,
						createdAt,
						text,
					},
				},
				{ merge: true }
			);
		}
	}, []);

	const renderSend = (props) => {
		return (
			<Send {...props}>
				<View>
					<MaterialCommunityIcons
						name='send'
						style={{ marginBottom: 5, marginRight: 5 }}
						size={32}
						color='#2e64e5'
					/>
				</View>
			</Send>
		);
	};

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#2e64e5',
					},
				}}
			/>
		);
	};

	const scrollToBottomComponent = () => {
		return (
			<MaterialCommunityIcons
				name='chevron-double-down'
				size={22}
				color='#333'
			/>
		);
	};

	return (
		<>
			<View style={styles.header}>
				<Pressable onPress={() => navigation.goBack()}>
					<Image
						style={styles.back}
						source={require('../../assets/goback.png')}
					/>
				</Pressable>
				<Image
					style={styles.avatar}
					source={require('../../assets/avatar.png')}
				/>
				<Text style={{ fontSize: 20, marginLeft: 5 }}>
					{userB.name}
				</Text>
			</View>
			<GiftedChat
				messages={messages}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: currentUser.email,
					avatar: 'https://placeimg.com/140/140/any',
				}}
				showAvatarForEveryMessage={true}
				alwaysShowSend
				renderSend={renderSend}
				renderBubble={renderBubble}
				scrollToBottom
				scrollToBottomComponent={scrollToBottomComponent}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'rgba(11, 204, 148, 0.35)',
		height: 69,
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
	},
	back: {
		width: 32,
		height: 32,
		marginHorizontal: 15,
	},
	avatar: {
		width: 48,
		height: 48,
		marginHorizontal: 10,
	},
});

export default MessLine;
