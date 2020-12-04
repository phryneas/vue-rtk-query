<template>
    <div class="loader" v-if="!data">
        <ProgressSpinner v-if="!data" />
    </div>
    <div v-else>
        <Button icon="pi pi-plus" label="Add Random Product" @click="addProduct" style="margin-bottom: 20px;" />
        <DataTable :value="data.products" :loading="isLoading" class="p-datatable-sm" :filters="filters">
            <template #header>
                <div class="table-header">
                    <span>Manage Products</span>
                    <div>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global']" placeholder="Search..." />
                        </span>
                        <Button style="margin-left: 10px;" icon="pi pi-refresh" @click="refetch" />
                    </div>
                </div>
            </template>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name" :sortable="true"></Column>
            <Column field="price" header="Price" :sortable="true">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.price)}}
                </template>
            </Column>
            <Column field="department" header="Department" :sortable="true"></Column>
            <Column field="rating" header="Reviews" :sortable="true">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>
            <Column field="status" header="Status" :sortable="true">
                <template #body="slotProps">
                    <span :class="`p-tag p-tag-${getTagColor(slotProps.data.status)}`">{{slotProps.data.status.toUpperCase()}}</span>
                </template>
            </Column>
            <Column :exportable="false">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success" @click="updateProduct(slotProps.data)" />
                    <Button style="margin-left: 10px;" icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteProduct(slotProps.data.id)" />
                </template>
            </Column>
            <template #footer>
                In total there are {{data.products ? data.products.length : 0 }} products.
            </template>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { reduxStore, useStore } from '@/store'
import { getTagColor, formatCurrency, generateProduct } from '@/utils'
import { Product, productApi } from '@/services/product'

export default defineComponent({
    setup() {
        const { data, error, isLoading, refetch } = useStore() as any
        const filters = ref({})

        const addProduct = () => {
            const newProduct = generateProduct()
            reduxStore.dispatch(productApi.endpoints.addProduct.initiate(newProduct))
        }

        const deleteProduct = (id: number) => {
            reduxStore.dispatch(productApi.endpoints.deleteProduct.initiate(id))
        }

        const updateProduct = (product: Product) => {
            const updatedProduct = {
                id: product.id,
                ...generateProduct()
            }
            reduxStore.dispatch(productApi.endpoints.updateProduct.initiate(updatedProduct))
        }

        return {
            data,
            error,
            isLoading,
            refetch,
            getTagColor,
            formatCurrency,
            filters,
            addProduct,
            updateProduct,
            deleteProduct
        }
    }
})
</script>

<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>