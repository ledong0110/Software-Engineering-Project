import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import Header from '../../components/Header';
import InputBar from '../../components/InputBar';
import LoginButton from '../../components/LoginButton';
import useAuth from '../../hooks/useAuth';

const LOGIN_URL = 'http://127.0.0.1:3000';

function Login(props) {
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
		if (password.length < 6) {
			Alert.alert('Mật khẩu phải nhiều hơn 6 ký tự. Vui lòng thử lại');
		} else if (username.length == 0) {
			Alert.alert('Tên người dùng bị bỏ trống. Vui lòng thử lại');
		} else {
			navigation.navigate('MainTab');
		}
		// try {
		// 	const response = await axios.post(
		// 		LOGIN_URL,
		// 		JSON.stringify({ username, password }),
		// 		{
		// 			headers: { 'Content-Type': 'application/json' },
		// 			withCredentials: true,
		// 		}
		// 	);

		// 	const accessToken = response?.data?.accessToken;
		// 	const expire = response?.data?.exp;
		// 	const user = response?.data?.user;
		// 	setAuth({ ...user, accessToken, expire });
		// 	console.log(auth);
		// 	setUsername('');
		// 	setPassword('');
		// } catch (err) {
		// 	console.log(err);
		// 	if (!err?.response) {
		// 		setErrMsg('No Server Response');
		// 	} else if (err.reponse?.status === 400) {
		// 		setErrMsg('Missing Username or Password');
		// 	} else if (err.response?.status === 401) {
		// 		setErrMsg('Unauthorized');
		// 	} else if (err.response?.status === 403) {
		// 		setErrMsg('Your username or password is Wrong');
		// 	} else {
		// 		setErrMsg('Login failed');
		// 	}
		// 	setState(true);
		// }
	};

	return (
		<View style={styles.body}>
			<Header name='Đăng nhập' />
			<InputBar
				placeholder='Tên người dùng'
				value={username}
				onChangeText={(username) => setUsername(username)}
			/>
			<InputBar
				placeholder='Mật khẩu'
				value={password}
				onChangeText={(password) => setPassword(password)}
				secureTextEntry={true}
			/>
			<LoginButton
				name='Đăng nhập'
				type='PRIMARY'
				onPress={handleSubmit}
			/>
			{state && <Text style={{ color: 'red' }}>{errMsg}</Text>}
			<Text style={styles.text}>
				Không có tài khoản?
				<Text
					onPress={() => navigation.navigate('Signup')}
					style={styles.signup}>
					{' '}
					Đăng ký{' '}
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
