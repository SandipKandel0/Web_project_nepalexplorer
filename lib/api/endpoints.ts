// ALL API Endpoints

export const API = {
    AUTH:{
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        UPDATE_PROFILE: '/api/auth/:id',
    },
    ADMIN: {
        USERS: '/api/admin/users',
        CREATE_USER: '/api/admin/users',
        GET_USER: '/api/admin/users/:id',
        UPDATE_USER: '/api/admin/users/:id',
        DELETE_USER: '/api/admin/users/:id',
    },
    GUIDE: {
        CREATE_REQUEST: '/api/guide/requests',
        GET_ALL_REQUESTS: '/api/guide/requests/all',
        GET_MY_GUIDE_REQUESTS: '/api/guide/requests/my-guide-requests',
        GET_MY_REQUESTED_GUIDES: '/api/guide/requests/my-requested-guides',
        GET_REQUEST: '/api/guide/requests/:id',
        APPROVE_REQUEST: '/api/guide/requests/:id/approve',
        DECLINE_REQUEST: '/api/guide/requests/:id/decline',
        DELETE_REQUEST: '/api/guide/requests/:id',
    },
    NOTIFICATION: {
        GET_NOTIFICATIONS: '/api/guide/notifications',
        GET_UNREAD_COUNT: '/api/guide/notifications/unread-count',
        MARK_AS_READ: '/api/guide/notifications/:id/read',
        MARK_ALL_READ: '/api/guide/notifications/mark-all-read',
        DELETE_NOTIFICATION: '/api/guide/notifications/:id',
    }
}