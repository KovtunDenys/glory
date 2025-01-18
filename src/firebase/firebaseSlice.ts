import { createSlice } from '@reduxjs/toolkit';
// import { getUsersFromFirebase } from './firebaseServices';
import { User } from '../interfaces/user';

/**
 * Redux Slice for managing users fetched from Firebase.
 * This slice handles the state related to users, including loading and error states.
 * It is used for fetching a list of users from Firebase Firestore.
 *
 * @typedef {Object} State
 * @property {User[]} users - The list of users.
 * @property {boolean} loading - A flag indicating whether users are being loaded.
 * @property {string | null} error - The error message, if any, that occurred during the fetching of users.
 * 
 * @example
 * // Example usage of the slice
 * import { useDispatch, useSelector } from 'react-redux';
 * import { getUsersFromFirebase } from './firebaseServices';
 * 
 * const dispatch = useDispatch();
 * const users = useSelector(state => state.firebase.users);
 * const loading = useSelector(state => state.firebase.loading);
 * const error = useSelector(state => state.firebase.error);
 * 
 * useEffect(() => {
 *   dispatch(getUsersFromFirebase());
 * }, [dispatch]);
 *
 * @see https://redux-toolkit.js.org/api/createSlice
 */

// const initialState = {
//     users: [] as User[],  
//     loading: false,       
//     error: null as string | null,          
// };

// const userSlice = createSlice({
//     name: 'firebase',
//     initialState, 
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getUsersFromFirebase.pending, (state) => {
//                 state.loading = true;  
//                 state.error = "";   
//             })
//             .addCase(getUsersFromFirebase.fulfilled, (state, action) => {
//                 state.users = action.payload || [];  
//                 state.loading = false;         
//             })
//             .addCase(getUsersFromFirebase.rejected, (state, action) => {
//                 state.loading = false;             
//                 state.error = action.error.message || 'Failed to fetch users';  
//             });
//     },
// });

// export default userSlice.reducer;