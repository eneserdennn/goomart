import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../features/auth/authSlice';

const devServerIp = process.env.devServerIp || 'https://ecomm.spookyorange.com';

const baseQuery = fetchBaseQuery({
    baseUrl: devServerIp,
    // credentials: 'include',
    // mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403) {
        console.log('sending refresh token');
        const oldToken = api.getState().auth.token;
        const refreshResult = await baseQuery({
            url: '/user/auth/',
            method: 'POST',
            body: { oldToken },
        }, api, extraOptions);
        console.log('refreshResult', refreshResult);
        if (refreshResult?.data?.access_token) {
            api.dispatch(setCredentials({ access_token: refreshResult.data.access_token }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Address'],
    endpoints: (builder) => ({}),
})
