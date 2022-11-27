import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

function LoginButton(props) {
	return (
		<Pressable
			style={[styles.button, styles[`button_${props.type}`]]}
			onPress={props.onPress}>
			<Text style={[styles.text, styles[`text_${props.type}`]]}>
				{props.name}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 20,
	},
	text: {
		alignItems: 'center',
		fontSize: 20,
	},
	button_PRIMARY: {
		backgroundColor: '#37B',
	},
	text_PRIMARY: {
		color: 'white',
	},
	text_SECONDARY: {
		color: 'gray',
		fontWeight: 'bold',
	},
});

export default LoginButton;
