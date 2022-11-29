import { DefaultRouteNames} from "@/configuration/AppConfiguration";

const DefaultActions = {
    signOut: 'signOut'
}

class DraweItemDefinition {
    name: string = ''
    icon: string = ''
    action: boolean = false
}

class DrawerItemGroup {
    group: string = ''
    auth: boolean = false
    items: Array<DraweItemDefinition> = []
}

const DrawerItems: Array<DrawerItemGroup> = [
    {
        group: 'User',
        auth: true,
        items: [
            { name: DefaultRouteNames.home.user , icon: 'las la-home', action: false},
            { name: 'inbox' , icon: 'las la-envelope', action: false},
            { name: 'dashboard', icon: 'las la-briefcase', action: false}
        ]
    },
    {
        group: 'Public',
        auth: false,
        items: [
            { name: DefaultRouteNames.home.public, icon: 'las la-globe', action: false},
            { name: 'scrollingPagination', icon: 'las la-stream', action: false},
            { name: 'regularPagination', icon: 'las la-file-alt', action: false},
            { name: 'about', icon: 'las la-building', action: false },
            { name: 'lorem', icon: 'las la-font', action: false },
            { name: 'notFound', icon: 'las la-exclamation-circle text-alert-300', action: false }
        ]
    },
    {
        group: 'Misc',
        auth: true,
        items: [
            { name: 'changeTheme', icon: 'las la-palette text-green-300', action: true},
            { name: 'changeLanguage', icon: 'las la-language text-red-300', action: true},
            { name: 'action2', icon: '', action: true},
            { name: 'action3', icon: 'la la-cc-visa text-yellow-400', action: true},
        ]
    }
]

const UserButtonActions = [
    [ { name:'notifications', label: 'notifications', icon: 'las la-bell', count: 1 }, { name:'messages', label: 'messages', icon: 'las la-envelope', count: 0 } ],
    [ { name:'profile', label: 'profile', icon: 'las la-user'}, { name:'settings', label: 'settings', icon: 'las la-cog'} ],
    [ { name: DefaultActions.signOut, label: DefaultActions.signOut, icon: 'las la-sign-out-alt' } ],
]

export { DefaultActions, DrawerItems, UserButtonActions, DrawerItemGroup, DraweItemDefinition }

