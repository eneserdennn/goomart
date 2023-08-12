import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/auth/login',
                method: 'POST',
                body: {...credentials}
            })
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
        changePassword: builder.mutation<{ statusCode: number; message: string }, { oldPassword: string; newPassword: string; token: string }>({
            query: ({oldPassword, newPassword, token}) => ({
                url: '/user/auth/change-password',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    oldPassword,
                    newPassword
                },
            }),
        }),
        updateUser: builder.mutation<{ statusCode: number; message: string }, { name: string; surname: string; email: string, campaignConsent: boolean, token: string }>({
            query: ({name, surname, email, token}) => ({
                url: '/user/profile',
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    name,
                    surname,
                    email
                },
            }),
        }),
    }),
});



export const {
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useVerifyForgottenPasswordCodeMutation,
    useChangeForgetPasswordMutation,
    useChangePasswordMutation,
    useUpdateUserMutation } = authApiSlice;
