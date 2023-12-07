package org.demo.product.controller

import org.demo.product.dto.output.ProductVariantDTO
import org.demo.product.repository.ProductVariantRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/variant")
class ProductVariantController(
    val productVariantRepository: ProductVariantRepository
) {

    @GetMapping("/{id}")
    suspend fun getProductVariant(
        @PathVariable
        id: Int
    ): ProductVariantDTO {
        return productVariantRepository.findById(id).map {
            ProductVariantDTO(it.id!!,
                it.name,
                it.description)
        }.orElseThrow()
    }

}