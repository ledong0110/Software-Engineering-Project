import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	getFocusedRouteNameFromRoute,
	NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountInfo from './screen/Account/AccountInfo';
import ChangeInfo from './screen/Account/ChangeInfo';
import MyAccountScreen from './screen/Account/MyAccountScreen';
import SettingAcc from './screen/Account/SettingAcc';
import Login from './screen/Auth/Login';
import Signup from './screen/Auth/Signup';
import ChatScreen from './screen/Chat/ChatScreen';
import MessLine from './screen/Chat/MessLine';
import HomeScreen from './screen/HomeScreen';
import TaskScreen from './screen/Task/TaskScreen';

const ListInfoStack = createStackNavigator();
const AccountStack = createStackNavigator();
const ChatStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ListInfo() {
	return (
		<ListInfoStack.Navigator screenOptions={{ headerShown: false }}>
			<ListInfoStack.Screen
				name='AccountInfo'
				component={AccountInfo}
			/>
			<ListInfoStack.Screen
				name='ChangeInfo'
				component={ChangeInfo}
			/>
		</ListInfoStack.Navigator>
	);
}

function Account() {
	return (
		<AccountStack.Navigator screenOptions={{ headerShown: false }}>
			<AccountStack.Screen
				name='MyAccountScreen'
				component={MyAccountScreen}
			/>
			<AccountStack.Screen
				name='ListInfo'
				component={ListInfo}
			/>
			<AccountStack.Screen
				name='SettingAcc'
				component={SettingAcc}
			/>
		</AccountStack.Navigator>
	);
}

function ChatRoute() {
	return (
		<ChatStack.Navigator screenOptions={{ headerShown: false }}>
			<ChatStack.Screen
				name='ChatScreen'
				component={ChatScreen}
			/>
			<ChatStack.Screen
				name='MessLine'
				component={MessLine}
			/>
		</ChatStack.Navigator>
	);
}

function MainTab() {
	const getTabBarStyle = (route) => {
		const routeName = getFocusedRouteNameFromRoute(route) ?? '';
		let display = routeName === 'MessLine' ? 'none' : 'flex';
		return { display };
	};

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#055c32',
			}}
			initialRouteName='Trang chủ'>
			<Tab.Screen
				name='Trang chủ'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='home'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Nhiệm vụ'
				component={TaskScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='clipboard-check'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Trò chuyện'
				component={ChatRoute}
				options={({ route }) => ({
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='message-text'
							color={color}
							size={size}
						/>
					),
					tabBarStyle: getTabBarStyle(route),
				})}
			/>
			<Tab.Screen
				name='Tôi'
				component={Account}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='account'
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='MainTab'
				component={MainTab}
			/>
			<Stack.Screen
				name='Login'
				component={Login}
			/>
			<Stack.Screen
				name='Signup'
				component={Signup}
			/>
			<Stack.Screen
				name='MyAccountScreen'
				component={MyAccountScreen}
			/>
		</Stack.Navigator>
	);
}

function RootNavigation() {
	return (
		<NavigationContainer>
			<AuthStack />
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<>
			<View style={styles.body}></View>
			<RootNavigation />
		</>
	);
}

const styles = StyleSheet.create({
	body: {
		marginTop: StatusBar.currentHeight,
	},
});
