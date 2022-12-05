import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	SectionList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
const Stack = createStackNavigator();

const Item = ({ title }) => {
	const navigation = useNavigation();
	const onPressHandler = () => {
		navigation.navigate('TaskDetail', {
			ID: title.ID,
			checkin: title.checkin,
			checkout: title.checkout,
			MCP: title.MCP,
		});
	};

	return (
		<Pressable onPress={onPressHandler}>
			<View style={styles.item}>
				<Text style={styles.title}>{title.name}</Text>
				<Image
					style={styles.image}
					source={require('../../assets/next.png')}
				/>
			</View>
		</Pressable>
	);
};

const SectionData = ({ title }) => {
	const [year, month, day] = title.split('-');
	var myDate = new Date(title);
	return (
		<View style={styles.section}>
			<Text style={styles.day}>{day}</Text>
			<View>
				<Text style={styles.monthyear}>
					{myDate.getDay() === 0
						? 'Chủ nhật'
						: `Thứ ${myDate.getDay() + 1}`}
				</Text>
				<Text style={styles.monthyear}>
					tháng {month} {year}
				</Text>
			</View>
		</View>
	);
};

export function MonthlyTask() {
	const [task, setTask] = useState([]);

	var taskList = [];

	let today = new Date();

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

	for (let obj in task) {
		var date = new Date(task[obj].title);
		if (date.getMonth() === today.getMonth()) {
			taskList.push(task[obj]);
		}
	}

	return (
		<SectionList
			sections={taskList}
			keyExtractor={(item, index) => item + index}
			renderItem={({ item }) => <Item title={item} />}
			renderSectionHeader={({ section: { title } }) => (
				<SectionData title={title} />
			)}
		/>
	);
}

export function WeeklyTask() {
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
	var taskList = [];

	let today = new Date();
	var first = today.getDate() - today.getDay();
	var last = first + 6;
	var firstDay = new Date(today.setDate(first)).toISOString().slice(0, 10);
	var lastDay = new Date(today.setDate(last)).toISOString().slice(0, 10);

	for (let obj in task) {
		var date = task[obj].title;
		if (date <= lastDay && date >= firstDay) {
			taskList.push(task[obj]);
		}
	}
	return (
		<SectionList
			sections={taskList}
			keyExtractor={(item, index) => item + index}
			renderItem={({ item }) => <Item title={item} />}
			renderSectionHeader={({ section: { title } }) => (
				<SectionData title={title} />
			)}
		/>
	);
}

export function DailyTask() {
	const [task, setTask] = useState([]);
	var taskList;

	let today = new Date().toISOString().slice(0, 10);

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

	for (let obj in task) {
		var date = task[obj].title;
		if (date === today) {
			taskList = task[obj].data;
		}
	}

	return (
		<View style={styles.body}>
			<FlatList
				style={{ width: '100%' }}
				data={taskList}
				renderItem={({ item }) => <Item title={item} />}
				keyExtractor={(item) => item.ID}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		marginTop: 20,
	},
	item: {
		backgroundColor: '#fff',
		width: '100%',
		height: 85,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
	},
	image: {
		width: 24,
		height: 28,
	},
	title: {
		width: '90%',
		height: '100%',
		fontSize: 24,
		textAlign: 'center',
		paddingRight: 90,
	},
	section: {
		width: '100%',
		height: 72,
		backgroundColor: 'rgba(11, 204, 148, 0.7)',
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomWidth: 1,
		marginTop: 16,
	},
	day: {
		fontSize: 32,
		width: '20%',
		height: '100%',
		textAlign: 'center',
		textAlignVertical: 'center',
		fontWeight: 'bold',
	},
	monthyear: {
		fontSize: 16,
	},
});
