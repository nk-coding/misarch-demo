package org.demo.product.dto.output

data class ProductDetailDTO(
    val id: Int,
    val name: String,
    val description: String,
    val variants: List<ProductVariantDTO>
)