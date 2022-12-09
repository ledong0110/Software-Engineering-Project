import { useNavigation } from '@react-navigation/native';
import React, {
	useCallback,
	useEffect, useRef, useState
} from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MessLine({ route }) {
	const { item } = route.params;
	const userB = item;
	const navigation = useNavigation();
	const [userName, setUserName] = useState('');
	const [messages, setMessages] = useState([]);
	const ws = useRef();
	ws.current = new WebSocket('http://127.0.0.1:3000');

	useEffect(() => {
		setMessages(item.message);
		ws.current.open = () => {
			console.log('Kết nối với server');
			// const getMessages = async () => {
			// 	const response = await fetch(MESSAGE_URL);
			// 	const json = await response.json();
			// 	setTaskList(json.user.TaskList)
			// };
		};
		ws.current.onerror = (e) => {
			Alert.alert(e.message);
		};
		ws.current.onmessage = (e) => {
			console.log(e.data);
		};
		ws.current.onclose = () => {
			Alert.alert('Mất kết nối với máy chủ');
		};
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
		if (messages) {
			console.log(messages)
			ws.current.send(JSON.stringify(messages));
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
					_id: item.id,
					avatar: '../../assets/avatar.png',
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
