// Routes array config
// [
//   {
//     group: 'Public',
//     auth: false,
//     routes: [{ name: 'home', icon: ''},{ name: 'about' },]
//   },
//   {
//     group: 'User',
//     auth: true,
//     routes: [{ name: 'dashboard', icon: 'las la-briefcase'}]
//   },
//   {
//     group: 'Misc',
//     auth: false,
//     routes: [{ name: 'changeTheme', icon: 'las la-palette text-green-300', action: true}]
//   }
// ]

import { RouteNames} from "@/configuration/app-configuration";

const DefaultActions = {
    signOut: 'signOut'
}

const DrawerItems = [
    {
        group: 'User',
        auth: true,
        items: [
            { name: RouteNames.home.user , icon: 'las la-home'},
            { name: 'inbox' , icon: 'las la-envelope'},
            { name: 'dashboard', icon: 'las la-briefcase'}
        ]
    },
    {
        group: 'Public',
        auth: false,
        items: [
            { name: RouteNames.home.public, icon: 'las la-globe'},
            { name: 'about', icon: 'las la-building' },
            { name: 'lorem', icon: 'las la-font' },
            { name: 'notFound', icon: 'las la-exclamation-circle text-alert-300' }
        ]
    },
    {
        group: 'Misc',
        auth: true,
        items: [
            { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            { name: 'action1', icon: 'las la-palette text-red-300', action: true},
            { name: 'action2', action: true},
            { name: 'action3', icon: 'la la-cc-visa text-yellow-400', action: true},
        ]
    }
]

const UserButtonActions = [
    [ { name:'notifications', label: 'notifications', icon: 'las la-bell', count: 1 }, { name:'messages', label: 'messages', icon: 'las la-envelope', count: 0 } ],
    [ { name:'profile', label: 'profile', icon: 'las la-user'}, { name:'settings', label: 'settings', icon: 'las la-cog'} ],
    [ { name: DefaultActions.signOut, label: DefaultActions.signOut, icon: 'las la-sign-out-alt' } ],
]

export { DefaultActions, DrawerItems, UserButtonActions }

