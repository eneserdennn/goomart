import {apiSlice} from "@/redux/api/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query({
            query: () => '/notification/my-notifications/all',
            method: 'GET',
        }),
        getReadNotifications: builder.query({
            query: () => '/notification/my-notifications/read',
            method: 'GET',
        }),
        getUnreadNotifications: builder.query({
            query: () => '/notification/my-notifications/unread',
            method: 'GET',
        }),
        markAsRead: builder.mutation({
            query: (id: number) => ({
                url: `/notification/read/:id`,
                method: 'POST',
            })
        }),
        readAll: builder.mutation({
            query: () => ({
                url: `/notification/my-notifications/read-all`,
                method: 'POST'
            })
        }),
    })
})


export const {
    useGetNotificationsQuery,
    useGetReadNotificationsQuery,
    useGetUnreadNotificationsQuery,
    useMarkAsReadMutation,
    useReadAllMutation,
} = notificationApiSlice
