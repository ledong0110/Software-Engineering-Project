import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { getAuth, signOut } from 'firebase/auth';

function MyAccountScreen(props) {
	const navigation = useNavigation();
	const onPressAccInfo = () => {
		navigation.navigate('ListInfo');
	};
	const onPressSet = () => {
		navigation.navigate('SettingAcc');
	};
	const onPressLogout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				navigation.navigate('Login');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	return (
		<>
			<Header name='Tài khoản của tôi' />
			<View style={styles.body}>
				<Pressable onPress={onPressAccInfo}>
					<View style={[styles.accountChoice, styles.first]}>
						<Text style={styles.text}>Thông tin tài khoản</Text>
						<View style={styles.imageContainer}>
							<Image
								style={styles.image}
								resizeMode='cover'
								source={require('../../assets/next.png')}
							/>
						</View>
					</View>
				</Pressable>
				<Pressable onPress={onPressSet}>
					<View style={styles.accountChoice}>
						<Text style={styles.text}>Cài đặt tài khoản</Text>
						<View style={styles.imageContainer}>
							<Image
								style={styles.image}
								resizeMode='cover'
								source={require('../../assets/next.png')}
							/>
						</View>
					</View>
				</Pressable>
				<Pressable onPress={onPressLogout}>
					<View style={styles.accountChoice}>
						<Text style={styles.text}>Đăng xuất</Text>
						<View style={styles.imageContainer}>
							<Image
								style={styles.image}
								resizeMode='cover'
								source={require('../../assets/next.png')}
							/>
						</View>
					</View>
				</Pressable>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: '#d9d9d9',
		flex: 1,
		flexDirection: 'column',
	},
	accountChoice: {
		flexGrow: 1,
		flexShrink: 0,
		flexDirection: 'row',
		width: '100%',
		height: 72,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		flexGrow: 10,
		flexBasis: 100,
		fontSize: 24,
		textAlign: 'center',
		paddingLeft: 50,
	},
	imageContainer: {
		flexGrow: 1,
		alignItems: 'center',
	},
	image: {
		width: 24,
		height: 28,
	},
	first: {
		marginTop: 50,
	},
});

export default MyAccountScreen;
