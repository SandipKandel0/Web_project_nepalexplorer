import { API_BASE_URL } from "./base-url";

// User endpoints
export const USER_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/user/register`,
  LOGIN: `${API_BASE_URL}/user/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/user/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/user/reset-password`,
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
    FORGOT_PASSWORD: `${API_BASE_URL}/guide/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/guide/reset-password`,
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
        GET_NOTIFICATIONS: '/guide/notifications',
        GET_UNREAD_COUNT: '/guide/notifications/unread-count',
        MARK_AS_READ: '/guide/notifications/:id/read',
        MARK_ALL_READ: '/guide/notifications/mark-all-read',
        DELETE_NOTIFICATION: '/guide/notifications/:id',
    }
}