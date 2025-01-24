"use client";

// Set auth cookies and local storage
export const setAuth = (data) => {
  // Set HttpOnly cookies for security
  document.cookie = `accessToken=${data.access_token}; path=/; max-age=${
    30 * 24 * 60 * 60
  }; SameSite=Lax`;
  document.cookie = `userRole=${data.roleType}; path=/; max-age=${
    30 * 24 * 60 * 60
  }; SameSite=Lax`;
  document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${
    30 * 24 * 60 * 60
  }; SameSite=Lax; HttpOnly`;

  // Store non-sensitive data in localStorage
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("firstName", data.firstName);
  localStorage.setItem("lastName", data.lastName);
};

// Clear auth state
export const clearAuth = () => {
  // Clear cookies
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  // Clear localStorage
  localStorage.clear();
};

// Check auth status
export const getAuthStatus = () => {
  if (typeof window === "undefined") return {};

  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});

  return {
    isAuthenticated: !!cookies.accessToken,
    role: cookies.userRole,
  };
};
