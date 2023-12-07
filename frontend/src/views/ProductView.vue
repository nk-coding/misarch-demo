<template>
    <div v-if="!evaluating">
        <v-sheet class="d-flex pa-2 align-center title-bar">
            <v-app-bar-title>{{ `Product: ${product?.name}` }}</v-app-bar-title>
            <div class="flex-grow-1"></div>
            <v-btn icon variant="outlined">
                <v-icon icon="mdi-plus" />
                <v-dialog activator="parent">
                    <v-card>
                        <v-card-title>Create product variant</v-card-title>
                        <v-card-text>
                            <v-text-field label="Name" variant="outlined" v-model="newName" />
                            <v-textarea label="Description" variant="outlined" v-model="newDescription" />
                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn variant="tonal" color="primary" @click="createProductVariant">Create</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-btn>
        </v-sheet>
        <div>
            <v-card v-for="(variant, idx) in variants" variant="outlined" class="mx-6 my-3" @click="$router.push(`/variant/${variant!.id}`)" :key="idx">
                <v-card-title>{{ variant?.name }}</v-card-title>
                <v-card-text>{{ variant?.description }}</v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useClient } from "@/graphql/client";
import { asyncComputed } from "@vueuse/core";
import { create } from "domain";
import { computed } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const client = useClient();
const router = useRouter();
const route = useRoute();

const productId = computed(() => {
    return route.params.product as string;
});

const evaluating = ref(true);
const product = asyncComputed(
    async () => {
        return (await client.getProduct({ id: Number.parseInt(productId.value) })).product!;
    },
    null,
    { shallow: false, evaluating }
);

const variants = computed(() => {
    return product.value?.variants ?? [];
});

const newName = ref("");
const newDescription = ref("");

async function createProductVariant() {
    const newProduct = await client.createProductVariant({
        product: Number.parseInt(productId.value),
        name: newName.value,
        description: newDescription.value
    });
    const id = newProduct.createProductVariant?.id;
    if (id) {
        router.push(`/variant/${id}`);
    }
}
</script>
