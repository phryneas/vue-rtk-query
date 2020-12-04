
import { computed, inject, onUnmounted, provide, InjectionKey, ref, ComputedRef } from 'vue'
import { configureStore } from '@reduxjs/toolkit'
import { QueryStatus } from '@rtk-incubator/rtk-query'

import { ProductResponse, productApi } from '@/services/product'

export const reduxStore = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
})

export interface StoreSymbolInterface {
    refetch: () => void;
    data: ComputedRef<ProductResponse | undefined>;
    isLoading: ComputedRef<boolean>;
    error: ComputedRef<boolean>;
}

const StoreSymbol: InjectionKey<StoreSymbolInterface> = Symbol()

/**
 * I would suggest renaming this to `provideProducts`, maybe?
 */
export function provideStore() {
    const store = ref(reduxStore.getState())

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState()
    })

    const { refetch, unsubscribe } = reduxStore.dispatch(productApi.endpoints.getProducts.initiate())

    const result = computed(() => productApi.endpoints.getProducts.select()(store.value))
  
  // this is already on there :)
  const isLoading = computed(() => result.value.isLoading);
  const error = computed(() => result.value.isError);

    onUnmounted(() => {
        unsubscribeStore()
        unsubscribe()
    })

    provide(StoreSymbol, {
        refetch,
        data,
        isLoading,
        error
    })
}

/**
 * I would suggest renaming this to `useProducts`, maybe?
 */
export function useStore() {
    const store = inject(StoreSymbol)
    if (!store) {
        throw new Error('Store error')
    }
    return store
}