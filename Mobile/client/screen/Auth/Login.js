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
import InputBar from '../../components/InputBar';
import LoginButton from '../../components/LoginButton';
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { NetworkInfo } from 'react-native-network-info';

const LOGIN_URL = 'http://10.128.82.4:3000';

function Login(props) {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState();
	// const navigation = useNavigation();

	// const onPressHandler = () => {
	// 	navigation.navigate('Signup');
	// };

	// useEffect(() => {
	// 	const auth = getAuth();

	// 	const unsubscribe = onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			navigation.navigate('MainTab');
	// 		} else {
	// 			return unsubscribe;
	// 		}
	// 	});
	// }, []);

	// const onPressLogin = () => {
	// 	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
	// 		Alert.alert('Invalid email');
	// 	} else if (password.length <= 6) {
	// 		Alert.alert('The password should be more than 6 letters');
	// 	} else {
	// 		signInWithEmailAndPassword(getAuth(), email, password)
	// 			.then((userCredential) => {
	// 				const user = userCredential.user;
	// 				navigation.navigate('MainTab');
	// 			})
	// 			.catch((error) => {
	// 				Alert.alert('The username or password is not correct');
	// 			});
	// 	}
	// };

	const { auth, setAuth } = useAuth();

	const navigation = useNavigation();
	const location = 'MainTab';

	const [errMsg, setErrMsg] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [state, setState] = useState(false);

	useEffect(() => {
		if (auth?.accessToken) navigation.navigate(location);
	});

	useEffect(() => {
		setErrMsg('');
	}, [username, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ username, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			const accessToken = response?.data?.accessToken;
			const expire = response?.data?.exp;
			const user = response?.data?.user;
			setAuth({ ...user, accessToken, expire });
			console.log(auth);
			setUsername('');
			setPassword('');
		} catch (err) {
			console.log(err);
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.reponse?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else if (err.response?.status === 403) {
				setErrMsg('Your username or password is Wrong');
			} else {
				setErrMsg('Login failed');
			}
			setState(true);
		}
	};

	return (
		<View style={styles.body}>
			<Header name='Login' />
			<InputBar
				placeholder='Username'
				value={username}
				onChangeText={(username) => setUsername(username)}
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
				onPress={handleSubmit}
			/>
			{state && <Text style={{ color: 'red' }}>{errMsg}</Text>}
			<Text style={styles.text}>
				Don't have an account?
				<Text
					onPress={() => navigation.navigate('Signup')}
					style={styles.signup}>
					{' '}
					Signup{' '}
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
		paddingVertical: 15,
		textAlignVertical: 'center',
	},
	signup: {
		color: '#37b',
		fontWeight: 'bold',
		justifyContent: 'center',
	},
});
export default Login;
