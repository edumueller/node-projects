import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	// Action creator
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data }); // dispatches some action. Since we used the same FETCH_USER, the header updates automatically when we run the action to add credits!
};
