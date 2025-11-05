import { getApiUrl, API_CONFIG } from "../config/api";

// Registration
export const register = async (userData) => {
  const response = await fetch(
    getApiUrl(`${API_CONFIG.endpoints.users}/register`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: Registration failed`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const errorText = await response.text();
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  } else {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};

// Login
export const login = async (credentials) => {
  const response = await fetch(
    getApiUrl(`${API_CONFIG.endpoints.users}/login`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: Login failed`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const errorText = await response.text();
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  } else {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

// Function to make authenticated API calls
export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  // Try different authorization header formats
  if (token) {
    // Most common format: Bearer token
    headers.Authorization = `Bearer ${token}`;

    // Some backends also expect these alternative formats:
    // headers.Authorization = token; // Just the token
    // headers['X-Auth-Token'] = token; // Custom header
    // headers['Authentication'] = `Bearer ${token}`; // Alternative spelling
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

// Example: Get user cart
export const getCart = async () => {
  const response = await authenticatedFetch(
    getApiUrl(API_CONFIG.endpoints.cart)
  );
  return response.json();
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Redirect to login page handled by components
};

// Get current user from localStorage
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    return parsedUser;
  } catch {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const isAuth = !!token;
  return isAuth;
};

// Legacy function aliases for backward compatibility
export const registerUser = register;
export const loginUser = login;
export const logoutUser = logout;
