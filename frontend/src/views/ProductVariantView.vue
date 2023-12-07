<template>
    <div v-if="!evaluating">
        <v-sheet class="d-flex pa-2 align-center title-bar">
            <v-app-bar-title>{{ `Product variant: ${productVariant?.name}` }}</v-app-bar-title>
            <div class="flex-grow-1"></div>
            <v-btn icon variant="outlined">
                <v-icon icon="mdi-plus" />
                <v-dialog activator="parent">
                    <v-card>
                        <v-card-title>Create inventory item</v-card-title>
                        <v-card-text>
                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn variant="tonal" color="primary" @click="createInventoryItem">Create</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-btn>
        </v-sheet>
        <div>
            <v-card v-for="(variant, idx) in items" variant="outlined" class="mx-6 my-3" @click="$router.push(`/product/${productVariant!.id}`)" :key="idx">
                <v-card-title>{{ variant?.id }}</v-card-title>
                <v-card-text>{{ variant?.inventoryState }}</v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useClient } from "@/graphql/client";
import { asyncComputed } from "@vueuse/core";
import { computed } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const client = useClient();
const router = useRouter();
const route = useRoute();

const productVariantId = computed(() => {
    return route.params.variant as string;
});

const evaluating = ref(true);
const productVariant = asyncComputed(
    async () => {
        return (await client.getProductVariant({ id: Number.parseInt(productVariantId.value) })).productVariant!;
    },
    null,
    { shallow: false, evaluating }
);

const items = computed(() => {
    return productVariant.value?.items ?? [];
});

async function createInventoryItem() {
    const newInventoryItem = await client.createInventoryItem({
        productVariant: Number.parseInt(productVariantId.value)
    });
    productVariant.value!.items!.push(newInventoryItem.createInventoryItem!)
}
</script>
