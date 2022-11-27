import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { DailyTask, MonthlyTask, WeeklyTask } from './TaskList';
import TaskDetail from './TaskDetail';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function TaskScreen() {
	return (
		<>
			<Header name='Nhiệm vụ' />
			<Tab.Navigator>
				<Tab.Screen
					name='Tháng này'
					component={MonthlyTaskDetail}
				/>
				<Tab.Screen
					name='Tuần này'
					component={WeeklyTaskDetail}
				/>
				<Tab.Screen
					name='Hôm nay'
					component={DailyTaskDetail}
				/>
			</Tab.Navigator>
		</>
	);
}

function MonthlyTaskDetail() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='MonthlyTask'
				component={MonthlyTask}
			/>
			<Stack.Screen
				name='TaskDetail'
				component={TaskDetail}
			/>
		</Stack.Navigator>
	);
}
function WeeklyTaskDetail() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='WeeklyTask'
				component={WeeklyTask}
			/>
			<Stack.Screen
				name='TaskDetail'
				component={TaskDetail}
			/>
		</Stack.Navigator>
	);
}
function DailyTaskDetail() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='DailyTask'
				component={DailyTask}
			/>
			<Stack.Screen
				name='TaskDetail'
				component={TaskDetail}
			/>
		</Stack.Navigator>
	);
}
const styles = StyleSheet.create({
	tab: {
		fontSize: 24,
	},
});
export default TaskScreen;
