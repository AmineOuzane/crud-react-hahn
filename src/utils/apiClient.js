import axios from 'axios';

const baseURL = 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

let onUnauthorizedLogout = () => {
  console.warn("Auth logout function not yet set in apiClient interceptor. Defaulting to basic redirect on 401.");
   if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('authenticated_username');
        window.location.href = '/login';
   }
};

export const setAuthLogoutFunction = (logoutCallback) => {
    if (typeof logoutCallback === 'function') {
        onUnauthorizedLogout = logoutCallback;
        console.log("Auth logout function successfully set in apiClient interceptor.");
    } else {
        console.error("Attempted to set non-function as Auth logout handler in apiClient.");
         onUnauthorizedLogout = () => {
              console.warn("Invalid logout function provided. Defaulting to basic redirect on 401.");
              if (typeof window !== 'undefined') {
                   localStorage.removeItem('access_token');
                   localStorage.removeItem('authenticated_username');
                   window.location.href = '/login';
              }
         };
    }
};

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Axios Response Error:', error.response || error);
        if (error.response && error.response.status === 401) {
            console.warn('401 Unauthorized detected by interceptor.');
            onUnauthorizedLogout();
        }
        return Promise.reject(error);
    }
);

export default apiClient;