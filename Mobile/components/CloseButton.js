import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
function CloseButton(props) {
	const navigation = useNavigation();
	const onPressBack = () => {
		navigation.goBack();
	};
	return (
		<Pressable
			style={styles.button}
			onPress={onPressBack}>
			<Text style={styles.text}>{props.name}</Text>
		</Pressable>
	);
}
const styles = StyleSheet.create({
	button: {
		marginTop: 35,
		width: '100%',
		height: '7.5%',
		backgroundColor: '#055c32',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
	},
});
export default CloseButton;
