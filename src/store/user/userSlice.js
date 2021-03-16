import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser(state, action) {
            let user = action.payload;
            if (user) {

                if (user.role?.permissions) {
                    let permissions = user.role.permissions.map(permission => permission.name);
                    user.role.permissions = permissions;
                }

                state.value = user;
            } else {
                state.value = null;
            }
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = state => state?.user?.value;