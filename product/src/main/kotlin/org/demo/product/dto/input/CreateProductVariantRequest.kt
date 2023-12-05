package org.demo.product.dto.input

data class CreateProductVariantRequest(
    val name: String,
    val description: String,
    val product: Int
)