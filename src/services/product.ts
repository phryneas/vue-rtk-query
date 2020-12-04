import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query'

export interface Product { 
  id: number
  name: string
  price: string
  department: string
  status: string
  rating: number
}

export interface ProductResponse {
  products: Product[];
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  entityTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, void>({
      query: () => '/products',
      provides: (result) => [...result.products.map(({ id }) => ({ type: 'Product', id })), { type: 'Product', id: 'LIST' }] as any,
    }),
    addProduct: builder.mutation<{ product: Product }, Omit<Product, 'id'>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body
      }),
      invalidates: [{ type: 'Product', id: 'LIST' }]
    }),
    updateProduct: builder.mutation<{ product: Product }, Product>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/products/${id}`,
          method: 'PUT',
          body
        }
      },
      invalidates: (_, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      }),
      invalidates: (_, id) => [{ type: 'Product', id}],
    })
  }),
});