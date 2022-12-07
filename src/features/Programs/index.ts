import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProgramResponse, SponsorResponse } from './types';

// Define a service using a base URL and expected endpoints
export const programsApi = createApi({
  reducerPath: 'programsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllPrograms: builder.query<ProgramResponse, void>({
      query: () => `programs`,
    }),
    getAllSponsors: builder.query<SponsorResponse, void>({
      query: () => `sponsors`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProgramsQuery, useGetAllSponsorsQuery } = programsApi