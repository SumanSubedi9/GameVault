const API_BASE_URL = "/api/users";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // Store user data in localStorage (you might want to use a more secure method)
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    // Clear local storage regardless of response
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    if (!response.ok) {
      console.warn("Logout request failed, but local storage cleared");
    }

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    // Still clear local storage even if request fails
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

// Get current user from localStorage
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
