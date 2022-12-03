import Task from '../pages/Task/index'
import Vehicle from '../pages/Vehicle/index'
import MCP from '../pages/MCP/index'
import Chat from '../pages/Chat/index'

import Unauthorized from '../pages/Unauthorized'
import  EmptyPage from '../pages/EmptyPage'
// public routes
const publicRoutes = [
     
    {path: 'unauthorized', component: Unauthorized, layout:'unauthorized'},
    {path: 'chat', component: Chat},
    {path: '*', component: EmptyPage, layout:'empty'}
]

// private routes
const privateRoutes = [
    {path: 'task', component: Task},
    {path: 'vehicle', component: Vehicle},
    {path: 'mcp', component: MCP},
]

export {publicRoutes, privateRoutes};