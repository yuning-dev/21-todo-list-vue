import TodoList from '@/pages/todolist/TodoList.vue'
import SignUp from '@/pages/signup/SignUp.vue'
import LogIn from '@/pages/login/LogIn.vue'

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