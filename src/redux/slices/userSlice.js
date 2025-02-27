import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const userData = action.payload;
            const token = userData.access_token || '';

            // Handle both id formats
            const userId = userData._id || userData.id || null;

            if (token) {
                localStorage.setItem('authToken', token);
                document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;
            }
            return { ...userData };
        },
        updateUser: (state, action) => {
            const updates = action.payload;
            const dateFields = ['dateOfBirth', 'createdAt', 'updatedAt'];

            Object.keys(updates).forEach((key) => {
                if (dateFields.includes(key) && updates[key]) {
                    try {
                        state[key] = new Date(updates[key]).toISOString();
                    } catch (error) {
                        console.error(
                            `Error processing date for ${key}:`,
                            error
                        );
                        state[key] = null;
                    }
                } else {
                    state[key] = updates[key];
                }
            });
        },
        clearUser: (state) => {
            localStorage.removeItem('authToken');
            document.cookie =
                'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            return initialState;
        }
    }
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

// Enhanced selectors
export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id || state.user._id;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
