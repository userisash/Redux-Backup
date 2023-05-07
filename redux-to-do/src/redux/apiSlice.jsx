import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = 'lTJicytLI3skHoWOOLyCDolpooQB8me7lAOeXtf4VzzNETsDoe2IVrmF'

const PEXELS_ENDPOINT = 'https://api.pexels.com/v1'

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PEXELS_ENDPOINT,
    headers: {
      Authorization: API_KEY,
    },
  }),
  endpoints: (builder) => ({
    searchPhotos: builder.query({
      query: (query) => `/search?query=${query}&per_page=10`,
    }),
  }),
})

export const { useSearchPhotosQuery } = imageApi
