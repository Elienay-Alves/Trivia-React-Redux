export const SUBMIT = 'SUBMIT';
export const TOKEN = 'TOKEN';

export const login = (value) => ({ type: SUBMIT, value });

export const getToken = (value) => ({ type: TOKEN, token: value });
