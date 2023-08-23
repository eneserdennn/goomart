import { apiSlice } from "@/redux/api/apiSlice";

interface Campaign {
    id: number;
    name: string;
    description: string;
    code: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    resourceId: number;
    amount: number;
    minCart: number;
    resourceType: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string | null;
    CampaignTranslation: any[]; // Adjust the type if needed
    conditions: string[];
}

export const campaignApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCampaigns: builder.query<Campaign[], void>({
            query: () => '/campaign',
        }),
        getCampaign: builder.query<Campaign, number>({
            query: (id) => `/campaign/${id}`,
        }),
    }),
});

export const { useGetCampaignsQuery, useGetCampaignQuery } = campaignApiSlice;
