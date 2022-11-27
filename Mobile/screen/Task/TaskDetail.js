import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

function TaskDetail({ route }) {
	const { ID, checkin, checkout, MCP } = route.params;
	const navigation = useNavigation();
	const ASPECT_RATIO = styles.map.width / styles.map.height;
	const LATITUDE_DELTA = 0.02;
	const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
	const INITIAL_POSITION = {
		latitude: 10.772096071845866,
		longitude: 106.65791252645789,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	};
	return (
		<View style={styles.body}>
			<Text style={styles.name}>Nhiệm vụ 1</Text>
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.text}>ID</Text>
					<Text style={styles.text}>MCP</Text>
					<Text style={styles.text}>Check in</Text>
					<Text style={styles.text}>Check out</Text>
				</View>
				<View style={styles.value}>
					<Text style={styles.text}>{ID}</Text>
					<Text style={styles.text}>{MCP}</Text>
					<Text style={styles.text}>{checkin}</Text>
					<Text style={styles.text}>{checkout}</Text>
				</View>
			</View>
			<View style={styles.imageContainer}>
				<MapView
					style={styles.map}
					provider={PROVIDER_GOOGLE}
					initialRegion={INITIAL_POSITION}></MapView>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					onPress={() => navigation.goBack()}
					style={styles.button}>
					<Text>Check in</Text>
				</Pressable>
				<Pressable style={[styles.button, styles.checkout]}>
					<Text>Check out</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		width: '100%',
		marginTop: 20,
		flexDirection: 'column',
	},
	name: {
		fontSize: 24,
		marginLeft: '5%',
	},
	container: {
		width: '100%',
		height: '35%',
		flexDirection: 'row',
	},
	title: {
		marginLeft: '5%',
		marginTop: '6%',
		width: '25%',
	},
	value: {
		marginLeft: 21,
		marginTop: 24,
		width: '80%',
		height: 108,
	},
	text: {
		fontSize: 16,
		paddingVertical: 5,
	},
	map: {
		alignSelf: 'center',
		width: 332,
		height: 223,
	},
	buttonContainer: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginTop: 10,
	},
	button: {
		width: 95,
		height: 31,
		backgroundColor: '#d9d9d9',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginHorizontal: 11.5,
	},
	checkout: {
		backgroundColor: '#00CC90',
		marginRight: 50,
	},
});

export default TaskDetail;
