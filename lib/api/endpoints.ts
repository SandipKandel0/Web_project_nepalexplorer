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