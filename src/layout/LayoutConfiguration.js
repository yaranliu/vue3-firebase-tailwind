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

let routes = [
    {
        group: 'Public',
        auth: false,
        routes: [{ name: 'home', icon: ''},{ name: 'about' },]
    },
    {
        group: 'User',
        auth: true,
        routes: [{ name: 'dashboard', icon: 'las la-briefcase'}]
    },
    {
        group: 'Misc',
        auth: false,
        routes: [
            { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            // { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            { name: 'changeTheme', icon: 'las la-palette text-red-300', action: true},
        ]
    }
]



let commands = [
    [ { name:'notifications', label: 'notifications', icon: 'las la-bell', count: 1 }, { name:'messages', label: 'messages', icon: 'las la-envelope', count: 0 } ],
    [ { name:'profile', label: 'profile', icon: 'las la-user'}, { name:'settings', label: 'settings', icon: 'las la-cog'} ],
    [ { name:'signOut', label: 'signOut', icon: 'las la-sign-out-alt' } ],
]

export { routes, commands }

