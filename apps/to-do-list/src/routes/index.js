import TodoList from '@/pages/todo-list/TodoList.vue'
import SignUp from '@/pages/sign-up/SignUp.vue'
import LogIn from '@/pages/log-in/LogIn.vue'

export default [
    {
        path: '/',
        name: 'todo-list',
        component: TodoList
    },
    { 
        path: '/sign-up',
        name: 'sign-up',
        component: SignUp
    },
    {
        path: '/login',
        name: 'log-in',
        component: LogIn
    }
]