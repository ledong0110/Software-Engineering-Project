import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CloseButton from '../../components/CloseButton';
import Header from '../../components/Header';
import Info from '../../components/Info';
class User {
	constructor(name, phone, email) {
		this.name = name;
		this.phone = phone;
		this.email = email;
	}
}
const UserConverter = {
	toFirestore: (user) => {
		return {
			name: user.name,
			phone: user.phone,
			email: user.email,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new User(data.name, data.phone, data.email);
	},
};

export default function AccountInfo() {
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const onPressBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const db = getFirestore();
				onSnapshot(
					doc(db, 'users', uid).withConverter(UserConverter),
					(doc) => {
						if (doc.exists()) {
							const userInfo = doc.data();
							setName(userInfo.name);
							setEmail(userInfo.email);
							setPhone(userInfo.phone);
						}
					}
				);
			}
		});
	}, []);
	return (
		<View style={styles.body}>
			<Header name='Tài khoản của tôi' />
			<Info
				title='Tên'
				value={name}
				change='Name'
			/>
			<Info
				title='Số điện thoại'
				value={phone}
				change='Phone'
			/>
			<Info
				title='Email'
				value={email}
				change='Email'
			/>
			<CloseButton
				name='Đóng'
				onPress={onPressBack}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#d9d9d9',
	},
});
