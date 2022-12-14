import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../components/Header';
import UserTask from '../data/UserTask';

function HomeScreen() {
	let Dates = [];
	let markedDays = {};
	for (let obj in UserTask) {
		Dates.push(UserTask[obj].title);
	}
	Dates.forEach((day) => {
		markedDays[day] = {
			selected: true,
			marked: true,
		};
	});

	return (
		<>
			<Header name='Trang chủ' />
			<View style={styles.body}>
				<Text style={styles.text}>Lịch làm việc</Text>
				<View style={styles.imageContain}>
					<Calendar
						enableSwipeMonths={true}
						horizontal={true}
						style={styles.calendar}
						markedDates={markedDays}
					/>
				</View>
				<Text style={styles.text1}>Tin tức</Text>
				<View style={styles.list}>
					<Pressable>
						<Image
							style={styles.circle}
							source={require('../assets/checked.png')}
						/>
					</Pressable>
					<Pressable>
						<Image
							style={styles.circle}
							source={require('../assets/unchecked.png')}
						/>
					</Pressable>
					<Pressable>
						<Image
							style={styles.circle}
							source={require('../assets/unchecked.png')}
						/>
					</Pressable>
					<Pressable>
						<Image
							style={styles.circle}
							source={require('../assets/unchecked.png')}
						/>
					</Pressable>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		flexDirection: 'column',
	},
	text: {
		flexGrow: 1,
		fontSize: 24,
		marginTop: 10,
		textAlign: 'center',
	},
	text1: {
		flexGrow: 1,
		textAlign: 'right',
		fontSize: 24,
		margin: 10,
	},
	calendar: {
		flexGrow: 25,
		width: '100%',
	},
	circle: {
		marginLeft: 15,
		height: 20,
		width: 20,
	},
	list: {
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
});
export default HomeScreen;
