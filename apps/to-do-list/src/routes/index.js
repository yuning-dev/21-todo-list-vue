import TodoList from '@/pages/TodoList/TodoList.vue'
import Insights from '@/pages/Insights/Insights.vue'
import Account from '@/pages/Account/Account.vue'
import EmailSettings from '@/pages/Account/EmailSettings/EmailSettings.vue'
import SecuritySettings from '@/pages/Account/SecuritySettings/SecuritySettings.vue' 
import InsightSettings from '@/pages/Account/InsightSettings/InsightSettings.vue' 

export default [
    {
        path: '/',
        name: 'todo-list',
        component: TodoList
    },
    { 
        path: '/account',
        name: 'account',
        component: Account,
        children: [
            {
                path: 'email',
                name: 'email-settings',
                component: EmailSettings
            },
            {
                path: 'security',
                name: 'security-settings',
                component: SecuritySettings
            },
            {
                path: 'insights',
                name: 'insight-settings',
                component: InsightSettings
            }
        ]
    },
    {
        path: '/insights',
        name: 'insights',
        component: Insights
    }
]