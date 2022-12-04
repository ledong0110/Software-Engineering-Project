import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import CloseButton from '../../components/CloseButton';
import Header from '../../components/Header';
import Info from '../../components/Info';

function SettingAcc() {
	const navigation = useNavigation();
	const onPressBack = () => {
		navigation.goBack();
	};
	return (
		<View style={styles.body}>
			<Header name='Cài đặt tài khoản' />
			<Info
				title='Ngôn ngữ'
				value='Tiếng Việt'
			/>
			<Pressable
				style={styles.button}
				onPress={onPressBack}></Pressable>
			<CloseButton name='Đóng' />
		</View>
	);
}
const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#d9d9d9',
	},
});
export default SettingAcc;
