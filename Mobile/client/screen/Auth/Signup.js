import { useNavigation } from '@react-navigation/native';
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
		if (password.length < 6) {
			Alert.alert('Mật khẩu phải nhiều hơn 6 ký tự. Vui lòng thử lại');
		} else if (username.length == 0) {
			Alert.alert('Tên người dùng bị bỏ trống. Vui lòng thử lại');
		} else {
			navigation.navigate('MainTab');
		}
	};
	return (
		<View style={styles.body}>
			<Header name='Đăng ký' />
			<InputBar
				placeholder='Họ Tên'
				value={name}
				onChangeText={(name) => setName(name)}
			/>
			<InputBar
				placeholder='Link Ảnh'
				value={pictureUrl}
				onChangeText={(pictureUrl) => setPictureUrl(pictureUrl)}
			/>
			<InputBar
				value={username}
				onChangeText={(username) => setUsername(username)}
				placeholder='Tên người dùng'
			/>
			<InputBar
				value={password}
				onChangeText={(password) => setPassword(password)}
				placeholder='Mật khẩu'
				secureTextEntry={true}
			/>
			<InputBar
				value={role}
				onChangeText={(role) => setRole(role)}
				placeholder='Vai trò'
			/>
			<LoginButton
				name='Đăng ký'
				type='PRIMARY'
				onPress={onPressHandler}
			/>
			<Text style={styles.text}>
				Đã có tài khoản?
				<Text
					onPress={() => navigation.navigate('Login')}
					style={styles.signup}>
					{' '}
					Đăng nhập{' '}
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
