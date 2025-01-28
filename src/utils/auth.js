"use client";

export const setAuth = (data) => {
  const userData = {
    ...data,
    ...(data.user || {}),
    ...(data.role || {}),
  };

  // Convert dates to ISO strings before storage
  const dateOfBirth = userData.dateOfBirth
    ? new Date(userData.dateOfBirth).toISOString()
    : null;

  // Store auth token
  if (userData.access_token) {
    localStorage.setItem("authToken", userData.access_token);
  } else if (userData.jwt) {
    localStorage.setItem("authToken", userData.jwt);
  }

  // Store user details in localStorage
  localStorage.setItem("userRole", userData.roleType || "CUSTOMER");
  localStorage.setItem("userType", userData.userType || "CUSTOMER");
  localStorage.setItem("userId", userData._id || "");
  localStorage.setItem("firstName", userData.firstName || "");
  localStorage.setItem("lastName", userData.lastName || "");
  localStorage.setItem("email", userData.email || "");
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("phoneNumber", userData.phoneNumber || "");
  localStorage.setItem("gender", userData.gender || "");
  localStorage.setItem("countryCode", userData.countryCode || "+91");
  localStorage.setItem("countryName", userData.countryName || "India");
  localStorage.setItem("dateOfBirth", dateOfBirth || "");

  // Set cookies
  const cookieExpiry = 30 * 24 * 60 * 60; // 30 days
  document.cookie = `userRole=${
    userData.roleType || "CUSTOMER"
  }; path=/; max-age=${cookieExpiry}; SameSite=Lax`;
  document.cookie = `userType=${
    userData.userType || "CUSTOMER"
  }; path=/; max-age=${cookieExpiry}; SameSite=Lax`;
  document.cookie = `accessToken=${
    userData.access_token || userData.jwt || ""
  }; path=/; max-age=${cookieExpiry}; SameSite=Lax`;
  if (userData.refreshToken) {
    document.cookie = `refreshToken=${userData.refreshToken}; path=/; max-age=${cookieExpiry}; SameSite=Lax; HttpOnly`;
  }
};

export const clearAuth = () => {
  // Clear cookies
  const cookiesToClear = [
    "accessToken",
    "userRole",
    "refreshToken",
    "connect.sid",
    "jwt",
  ];

  cookiesToClear.forEach((cookie) => {
    document.cookie = `${cookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  });

  // Clear localStorage
  localStorage.clear();
  sessionStorage.clear();
};

export const getAuthStatus = () => {
  if (typeof window === "undefined") return false;

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  return {
    isAuthenticated: isLoggedIn && !!authToken,
    role: userRole || null,
  };
};
