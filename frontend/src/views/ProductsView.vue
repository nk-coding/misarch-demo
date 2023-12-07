<template>
    <div v-if="!evaluating">
        <v-sheet class="d-flex pa-2 align-center title-bar" background="secondary">
            <v-app-bar-title>Products</v-app-bar-title>
            <div class="flex-grow-1"></div>
            <v-btn icon variant="outlined">
                <v-icon icon="mdi-plus" />
                <v-dialog activator="parent">
                    <v-card>
                        <v-card-title>Create product</v-card-title>
                        <v-card-text>
                            <v-text-field label="Name" variant="outlined" v-model="newName" />
                            <v-textarea label="Description" variant="outlined" v-model="newDescription" />
                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn variant="tonal" color="primary" @click="createProduct">Create</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-btn>
        </v-sheet>
        <div>
            <v-card v-for="(product, idx) in products" variant="outlined" class="mx-6 my-3" @click="$router.push(`/product/${product!.id}`)" :key="idx">
                <v-card-title>{{ product?.name }}</v-card-title>
                <v-card-text>{{ product?.description }}</v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useClient } from "@/graphql/client";
import { asyncComputed } from "@vueuse/core";
import { create } from "domain";
import { ref } from "vue";
import { useRouter } from "vue-router";

const client = useClient();
const router = useRouter();

const evaluating = ref(true);
const products = asyncComputed(
    async () => {
        return (await client.getProducts()).products ?? [];
    },
    null,
    { shallow: false, evaluating }
);

const newName = ref("");
const newDescription = ref("");

async function createProduct() {
    const newProduct = await client.createProduct({
        name: newName.value,
        description: newDescription.value
    });
    const id = newProduct.createProduct?.id;
    if (id) {
        router.push(`/product/${id}`);
    }
}
</script>
