import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import InputBar from '../../components/InputBar';
import LoginButton from '../../components/LoginButton';

function Signup(props) {
	const [name, setName] = useState('');
	const [pictureUrl, setPictureUrl] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');

	const navigation = useNavigation();
	const onPressHandler = () => {
		// let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		// if (reg.test(email) === false) {
		// 	Alert.alert('Invalid email');
		// }
		// if (password.length <= 6) {
		// 	Alert.alert('The password should be more than 6 letters');
		// } else if (password !== confirm_password) {
		// 	Alert.alert('The confirm password is not correct');
		// } else {
		// 	createUserWithEmailAndPassword(getAuth(), email, password)
		// 		.then((userCredential) => {
		// 			setDoc(
		// 				doc(getFirestore(), 'users', userCredential.user.uid),
		// 				{
		// 					username: name,
		// 					email: email,
		// 					phone: phone,
		// 					password: password,
		// 				}
		// 			);
		// 		})
		// 		.then(() => {
		// 			navigation.navigate('Login');
		// 		})
		// 		.catch((error) => {
		// 			const errorCode = error.code;
		// 			const errorMessage = error.message;
		// 		});
		// }
		if (password.length < 6) {
			Alert.alert('The password should be more than 6 letters');
		} else {
			var InsertAPIUrl = 'http://192.168.1.118:3000';
			var headers = {
				Accept: 'application/json, text/plain, */*',
				'Content-type': 'application/json',
			};
			var data = {
				Name: name,
				Picture: pictureUrl,
				Username: username,
				Password: password,
				Role: role,
			};
			fetch(InsertAPIUrl, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(data),
			})
				.then((response) => response.json())
				.then((response) => {
					alert(response[0].Message);
				})
				.catch((error) => {
					alert(error);
				});
		}
	};
	return (
		<View style={styles.body}>
			<Header name='Sign up' />
			<InputBar
				placeholder='Name'
				value={name}
				onChangeText={(name) => setName(name)}
			/>
			<InputBar
				placeholder='Picture'
				value={pictureUrl}
				onChangeText={(pictureUrl) => setPictureUrl(pictureUrl)}
			/>
			<InputBar
				value={username}
				onChangeText={(username) => setUsername(username)}
				placeholder='Username'
			/>
			<InputBar
				value={password}
				onChangeText={(password) => setPassword(password)}
				placeholder='Password'
				secureTextEntry={true}
			/>
			<InputBar
				value={role}
				onChangeText={(role) => setRole(role)}
				placeholder='Role'
			/>
			<LoginButton
				name='Sign up'
				type='PRIMARY'
				onPress={onPressHandler}
			/>
			<Text style={styles.text}>
				Have an account?
				<Text
					onPress={() => navigation.navigate('Login')}
					style={styles.signup}>
					{' '}
					Log in{' '}
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
export default Signup;
