import Task from '../pages/Task/index'
import Vehicle from '../pages/Vehicle/index'
import MCP from '../pages/MCP/index'
import Chat from '../pages/Chat/index'
import Authentication from '../pages/Authentication/index'

// public routes
const publicRoutes = [
    {path: '/', component: Authentication, layout: 'login'},
    {path: '/task', component: Task, private: false},
    {path: '/vehicle', component: Vehicle, private: true},
    {path: '/mcp', component: MCP, private: true},
    {path: '/chat', component: Chat, private: true},
]

export {publicRoutes};