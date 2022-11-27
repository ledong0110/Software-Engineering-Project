import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../../components/Header';

function ChangeInfo({ route }) {
	const navigation = useNavigation();

	const { value, change } = route.params;
	const onPressHandler = () => {
		navigation.navigate('AccountInfo');
		if (change == 'Name') {
			updateDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid), {
				name: info,
			});
		} else if (change == 'Phone') {
			updateDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid), {
				phone: info,
			});
		} else if (change == 'Email') {
			updateDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid), {
				email: info,
			});
		}
	};
	const [info, setInfo] = useState({ value });
	return (
		<>
			<Header
				name={
					change === 'Name'
						? 'Đổi tên'
						: change === 'Email'
						? 'Đổi email'
						: 'Đổi số điện thoại'
				}
			/>
			<View style={styles.body}>
				<View style={styles.container}>
					<View style={styles.inputText}>
						<Text style={styles.text}>
							{change === 'Name'
								? 'Tên'
								: change === 'Email'
								? 'Email'
								: 'Số điện thoại'}
						</Text>
						<TextInput
							style={styles.input}
							defaultValue={value}
							value={info}
							onChangeText={setInfo}
						/>
					</View>
				</View>

				<View style={styles.closeButton}>
					<Pressable
						style={styles.button}
						onPress={onPressHandler}>
						<Text style={styles.text1}>Lưu</Text>
					</Pressable>
				</View>
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#d9d9d9',
		flexDirection: 'column',
	},
	container: {
		flexGrow: 2,
	},
	inputText: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		height: 72,
		marginTop: 40,
		paddingLeft: 16,
		borderRadius: 20,
	},
	input: {
		flexGrow: 2,
		textAlignVertical: 'center',
		fontSize: 15,
	},
	text: {
		flexGrow: 2,
		textAlignVertical: 'center',
		fontSize: 14,
	},
	closeButton: {
		flexGrow: 8,
	},
	button: {
		marginTop: 35,
		width: '100%',
		height: 48,
		backgroundColor: '#055c32',
		justifyContent: 'center',
	},
	text1: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
	},
});
export default ChangeInfo;
