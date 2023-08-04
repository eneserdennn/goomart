import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const devServerIp = 'https://ecomm.spookyorange.com';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: devServerIp }),
    endpoints: (builder) => ({
        login: builder.mutation<{ access_token: string }, { username: string; password: string }>({
            query: (credentials) => ({
                url: '/user/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getProfile: builder.query<any, void>({
            query: (token) => ({
                url: '/user/profile',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        register: builder.mutation<{ statusCode: number; message: string }, {
            email: string;
            password: string;
            name: string;
            surname: string;
            campaignConsent: boolean;
        }>({
            query: (newUser) => ({
                url: '/user/auth/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        forgotPassword: builder.mutation<{ statusCode: number; message: string }, {
            email: string;
        }>({
            query: (emailObj) => ({
                url: '/user/auth/forgot-password',
                method: 'POST',
                body: emailObj,
            }),
        }),
        verifyForgottenPasswordCode: builder.mutation<{ statusCode: number; message: string }, { email: string; verificationCode: string }>({
            query: (payload) => ({
                url: '/user/auth/verify-forgotten-password-code',
                method: 'POST',
                body: payload,
            }),
        }),
        changeForgetPassword: builder.mutation<{ statusCode: number; message: string }, { email: string; newPassword: string; verificationCode: string }>({
            query: (payload) => ({
                url: '/user/auth/change-forget-password',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useGetProfileQuery,
    useRegisterMutation,
    useForgotPasswordMutation,
    useVerifyForgottenPasswordCodeMutation,
    useChangeForgetPasswordMutation
} = apiSlice;
