import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function Header(props) {
	return (
		<View style={styles.header}>
			<Text style={styles.text}>{props.name}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	header: {
		backgroundColor: 'rgba(11, 204, 148, 0.35)',
		height: 69,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#055c32',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 28,
	},
});
export default Header;
