export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api";

// User endpoints
export const USER_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/user/register`,
  LOGIN: `${API_BASE_URL}/user/login`,
  GET_PROFILE: (id: string) => `${API_BASE_URL}/user/${id}`,
  UPDATE_PROFILE: (id: string) => `${API_BASE_URL}/user/${id}`,
  ADD_FAVOURITE: `${API_BASE_URL}/user/favourite/add`,
  REMOVE_FAVOURITE: `${API_BASE_URL}/user/favourite/remove`,
  GET_FAVOURITES: (userId: string) => `${API_BASE_URL}/user/${userId}/favourites`,
};

// Guide endpoints
export const GUIDE_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/guide/register`,
  LOGIN: `${API_BASE_URL}/guide/login`,
  GET_ALL: `${API_BASE_URL}/guide`,
  GET_PROFILE: (id: string) => `${API_BASE_URL}/guide/${id}`,
  UPDATE_PROFILE: (id: string) => `${API_BASE_URL}/guide/${id}`,
};

// ALL API Endpoints

export const API = {
    AUTH:{
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        UPDATE_PROFILE: '/auth/:id',
    },
    ADMIN: {
        USERS: '/admin/users',
        CREATE_USER: '/admin/users',
        GET_USER: '/admin/users/:id',
        UPDATE_USER: '/admin/users/:id',
        DELETE_USER: '/admin/users/:id',
    },
    GUIDE: {
        CREATE_REQUEST: '/guide/requests',
        GET_ALL_REQUESTS: '/guide/requests/all',
        GET_MY_GUIDE_REQUESTS: '/guide/requests/my-guide-requests',
        GET_MY_REQUESTED_GUIDES: '/guide/requests/my-requested-guides',
        GET_REQUEST: '/guide/requests/:id',
        APPROVE_REQUEST: '/guide/requests/:id/approve',
        DECLINE_REQUEST: '/guide/requests/:id/decline',
        DELETE_REQUEST: '/guide/requests/:id',
    },
    NOTIFICATION: {
        // Guide notifications
        GUIDE_GET_NOTIFICATIONS: '/guide/notifications',
        GUIDE_GET_UNREAD_COUNT: '/guide/notifications/unread-count',
        GUIDE_MARK_AS_READ: '/guide/notifications/:id/read',
        GUIDE_MARK_ALL_READ: '/guide/notifications/mark-all-read',
        GUIDE_DELETE_NOTIFICATION: '/guide/notifications/:id',
        // User notifications
        USER_GET_NOTIFICATIONS: '/user/notifications',
        USER_MARK_AS_READ: '/user/notifications/:id/read',
        USER_DELETE_NOTIFICATION: '/user/notifications/:id',
    }
}