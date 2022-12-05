import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, getFirestore, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import Header from '../components/Header';

const Task =
	//array of tasks
	[
		{
			title: '2022-12-20',
			//array of data details in one day
			data: [
				{
					ID: 334,
					MCP: '1, 2, 3',
					checkin: '08:30 AM',
					checkout: '',
				},
				{
					ID: 321,
					MCP: '3, 5, 8',
					checkin: '09:30 AM',
					checkout: '',
				},
				//...more
			],
		},
		{
			title: '2022-12-15',
			data: [
				{
					ID: 315,
					MCP: '1, 2, 3',
					checkin: '08:30 AM',
					checkout: '',
				},
				{
					ID: 311,
					MCP: '6, 10, 13',
					checkin: '09:30 AM',
					checkout: '',
				},
				//...more
			],
		},
		{
			title: '2022-12-09',
			data: [
				{
					ID: 309,
					MCP: '12, 20, 26',
					checkin: '08:30 AM',
					checkout: '',
				},
				{
					ID: 308,
					MCP: '1, 3, 33',
					checkin: '09:30 AM',
					checkout: '',
				},
				//...more
			],
		},
		{
			title: '2022-12-05',
			data: [
				{
					ID: 304,
					MCP: '2, 5, 12',
					checkin: '08:30 AM',
					checkout: '',
				},
				//...more
			],
		},
		{
			title: '2022-12-01',
			data: [
				{
					ID: 302,
					MCP: '5, 6, 7',
					checkin: '08:30 AM',
					checkout: '',
				},
				{
					ID: 301,
					MCP: '3, 5, 9',
					checkin: '09:30 AM',
					checkout: '',
				},
				{
					ID: 300,
					MCP: '3, 5, 8',
					checkin: '09:30 AM',
					checkout: '',
				},
				//...more
			],
		},
	];

function HomeScreen() {
	// const [task, setTask] = useState([]);
	// const auth = getAuth();
	
	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
			
	// 		user.getIdToken().then(function (idToken) {
	// 		});
	// 		const uid = user.uid;
	// 		const db = getFirestore();
	// 		getDoc(doc(db, 'users', uid)).then((docSnap) => {
	// 			if (docSnap.exists()) {
	// 				setTask(docSnap.data().Task);
	// 			}
	// 		});
	// 	}
	// });

	let Dates = [];
	let markedDays = {};
	for (let obj in Task) {
		Dates.push(Task[obj].title);
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
				<Text style={styles.text}>Work Calendar</Text>
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
		margin: 10,
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
