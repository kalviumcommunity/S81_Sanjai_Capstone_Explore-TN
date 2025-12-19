import API from "./api";

/**
 * User Service - handles all user-related API calls
 */

// Get user profile
export const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await API.get("/User/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Update user profile (name)
export const updateUserProfile = async (name) => {
    const token = localStorage.getItem("token");
    const response = await API.put(
        "/User/profile",
        { name },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// Delete user account
export const deleteUserAccount = async () => {
    const token = localStorage.getItem("token");
    const response = await API.delete("/User/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
