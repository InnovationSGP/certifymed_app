// utils/auth.js
"use client";

import Cookies from "js-cookie";
import axiosInstance from "@/utils/axios";

export const setAuth = (data) => {
  try {
    // Normalize user data
    const userData = {
      ...data,
      ...(data.user || {}),
      ...(data.role || {}),
    };

    // Convert dates to ISO strings before storage
    const dateOfBirth = userData.dateOfBirth
      ? new Date(userData.dateOfBirth).toISOString()
      : null;

    // Set consistent cookie configuration
    const cookieExpiry = new Date();
    cookieExpiry.setDate(cookieExpiry.getDate() + 30);
    const cookieOptions = `expires=${cookieExpiry.toUTCString()}; path=/; SameSite=Lax`;

    // Set essential cookies consistently
    document.cookie = `accessToken=${
      userData.access_token || userData.jwt || ""
    }; ${cookieOptions}`;
    document.cookie = `jwt=${
      userData.access_token || userData.jwt || ""
    }; ${cookieOptions}`;
    document.cookie = `userRole=${
      userData.roleType || "CUSTOMER"
    }; ${cookieOptions}`;
    document.cookie = `userType=${
      userData.userType || "CUSTOMER"
    }; ${cookieOptions}`;

    if (userData.refreshToken) {
      document.cookie = `refreshToken=${userData.refreshToken}; ${cookieOptions}; HttpOnly`;
    }

    // Store user details consistently
    const storageData = {
      authToken: userData.access_token || userData.jwt,
      userRole: userData.roleType || "CUSTOMER",
      userType: userData.userType || "CUSTOMER",
      userId: userData._id || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      isLoggedIn: "true",
      phoneNumber: userData.phoneNumber || "",
      gender: userData.gender || "",
      countryCode: userData.countryCode || "+91",
      countryName: userData.countryName || "India",
      dateOfBirth: dateOfBirth || "",
    };

    // Set localStorage items
    Object.entries(storageData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        localStorage.setItem(key, value);
      }
    });

    // Update axios headers
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
      userData.access_token || userData.jwt
    }`;

    return true;
  } catch (error) {
    console.error("Error setting auth data:", error);
    return false;
  }
};

export const clearAuth = () => {
  try {
    // Clear cookies
    const cookiesToClear = [
      "accessToken",
      "refreshToken",
      "userRole",
      "userType",
      "userId",
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "gender",
      "countryCode",
      "countryName",
      "connect.sid",
      "jwt",
      "G_AUTHUSER_H",
      "G_ENABLED_IDPS",
    ];

    // Clear cookies from all possible paths and domains
    cookiesToClear.forEach((cookieName) => {
      ["/auth", "/", ""].forEach((path) => {
        // Clear using Cookies library
        Cookies.remove(cookieName, { path });
        Cookies.remove(cookieName, { path, domain: window.location.hostname });

        // Also clear using document.cookie for thoroughness
        document.cookie = `${cookieName}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `${cookieName}=; path=${path}; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });

      // Special handling for localhost
      if (window.location.hostname === "localhost") {
        Cookies.remove(cookieName, { path: "/", domain: "localhost" });
      }
    });

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Clear axios headers
    delete axiosInstance.defaults.headers.common["Authorization"];

    // Handle Google signout if gapi is available
    if (window.gapi?.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2) {
        try {
          auth2.signOut();
        } catch (e) {
          console.error("Error signing out of Google Auth2:", e);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error clearing auth data:", error);

    // Try basic cleanup even if main clear fails
    try {
      localStorage.clear();
      sessionStorage.clear();
      delete axiosInstance.defaults.headers.common["Authorization"];
    } catch (e) {
      console.error("Error in fallback cleanup:", e);
    }

    return false;
  }
};

export const logout = async () => {
  try {
    // Attempt to revoke Google token
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      try {
        await fetch(
          `https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`
        );
      } catch (e) {
        console.error("Error revoking Google token:", e);
      }
    }

    // Backend logout calls
    const logoutPromises = [
      axiosInstance.post("/auth/api/users/logout"),
      axiosInstance.get("/auth/logout"),
    ];
    await Promise.allSettled(logoutPromises);

    // Clear all auth data
    clearAuth();

    // Create Google logout iframe for complete signout
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "https://accounts.google.com/logout";
    document.body.appendChild(iframe);
    setTimeout(() => document.body.removeChild(iframe), 3000);

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);

    // Clear auth data even if API calls fail
    clearAuth();

    return {
      success: false,
      error: error.response?.data?.message || "An error occurred during logout",
    };
  }
};

export const getAuthStatus = () => {
  if (typeof window === "undefined") return false;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const accessTokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));

  return {
    isAuthenticated: isLoggedIn && !!authToken && !!accessTokenCookie,
    role: userRole || null,
  };
};
