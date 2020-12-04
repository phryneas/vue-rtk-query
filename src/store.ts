import { configureStore } from '@reduxjs/toolkit'
import { ProductResponse, productApi } from './services/product'
import { QueryStatus } from '@rtk-incubator/rtk-query'
import { computed, inject, onUnmounted, provide, InjectionKey, ref, ComputedRef } from 'vue'

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

export function provideStore() {
    const store = ref(reduxStore.getState())

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState()
    })

    const { refetch, unsubscribe } = reduxStore.dispatch(productApi.endpoints.getProducts.initiate())

    const result = computed(() => productApi.endpoints.getProducts.select()(store.value))
  
    const isLoading = computed(() => result.value.status === QueryStatus.pending)
    const error = computed(() => result.value.status === QueryStatus.rejected)
    const data = computed(() => result.value.data)

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

export function useStore() {
    return inject(StoreSymbol)
}