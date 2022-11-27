import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
} from 'react-native';
import Header from '../../components/Header';
import InputBar from './InputBar';
import LoginButton from './LoginButton';
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from 'firebase/auth';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState();
	const navigation = useNavigation();

	const onPressHandler = () => {
		navigation.navigate('Signup');
	};

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.navigate('MainTab');
			} else {
				return unsubscribe;
			}
		});
	}, []);

	const onPressLogin = () => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			Alert.alert('Invalid email');
		} else if (password.length <= 6) {
			Alert.alert('The password should be more than 6 letters');
		} else {
			signInWithEmailAndPassword(getAuth(), email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					navigation.navigate('MainTab');
				})
				.catch((error) => {
					Alert.alert('The username or password is not correct');
				});
		}
	};

	return (
		<View style={styles.body}>
			<Header name='Login' />
			<InputBar
				placeholder='Email'
				value={email}
				onChangeText={(email) => setEmail(email)}
			/>
			<InputBar
				placeholder='Password'
				value={password}
				onChangeText={(password) => setPassword(password)}
				secureTextEntry={true}
			/>
			<LoginButton
				name='Login'
				type='PRIMARY'
				onPress={onPressLogin}
			/>
			<LoginButton
				name='Forgot Password?'
				type='SECONDARY'
			/>
			<Text style={styles.text}>
				Don't have an account?
				<Text
					onPress={onPressHandler}
					style={styles.signup}>
					Sign up
				</Text>
			</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	body: {
		alignItems: 'center',
		padding: 20,
	},
	text: {
		marginTop: 70,
		fontSize: 14,
		textAlignVertical: 'center',
	},
	signup: {
		color: '#37b',
		fontWeight: 'bold',
		justifyContent: 'center',
	},
});
export default Login;
