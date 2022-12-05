import {v4 as uuidv4} from 'uuid'
const ContactList = [
	{
		id: uuidv4(),
		name: 'Trần Văn C',
		pictureUrl: '../../assets/avatar.png',
		preview: 'Hello developer',
		time: '12:10',
		message: [
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		],
	},
	{
		id: uuidv4(),
		name: 'Lê Thị B',
		pictureUrl: '../../assets/avatar.png',
		preview: 'Hello developer',
		time: '9:10',
		message: [
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		],
	},
	{
		id: uuidv4(),
		name: 'Thông báo MCP',
		pictureUrl: '../../assets/avatar.png',
		preview: 'Hello developer',
		time: '7:43',
		message: [
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		],
	},
	{
		id: uuidv4(),
		name: 'Nguyễn Văn A',
		pictureUrl: '../../assets/avatar.png',
		preview: 'Hello developer',
		time: '5:23',
		message: [
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: Math.floor(Math.random() * 100),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		],
	},
];
export default ContactList;