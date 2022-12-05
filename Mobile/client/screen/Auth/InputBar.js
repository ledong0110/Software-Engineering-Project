import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

function InputBar(props) {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder={props.placeholder}
				value={props.value}
				onChangeText={props.onChangeText}
				secureTextEntry={props.secureTextEntry}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '100%',
		height: 40,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#d9d9d9',
		marginVertical: 10,
		justifyContent: 'center',
	},
	input: {
		paddingHorizontal: 10,
	},
});
export default InputBar;
