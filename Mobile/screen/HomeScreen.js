import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, getFirestore, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Header from '../components/Header';

function HomeScreen() {
	const [task, setTask] = useState([]);
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			const db = getFirestore();
			getDoc(doc(db, 'users', uid)).then((docSnap) => {
				if (docSnap.exists()) {
					setTask(docSnap.data().Task);
				}
			});
		}
	});

	let Dates = [];
	let markedDays = {};
	for (let obj in task) {
		Dates.push(task[obj].title);
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
					<CalendarList
						horizontal={true}
						style={styles.calendar}
						enableSwipeMonths={true}
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
