package org.demo.product.controller

import org.demo.product.dto.input.CreateProductRequest
import org.demo.product.dto.input.CreateProductVariantRequest
import org.demo.product.dto.output.ProductDTO
import org.demo.product.dto.output.ProductVariantDTO
import org.demo.product.model.Product
import org.demo.product.model.ProductVariant
import org.demo.product.repository.ProductRepository
import org.demo.product.repository.ProductVariantRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/product")
class ProductController(
    val productRepository: ProductRepository,
    val productVariantRepository: ProductVariantRepository
) {

    @GetMapping("/")
    fun getProducts(): List<ProductDTO> {
        return productRepository.findAll().map { ProductDTO(it.id!!, it.name, it.description) }
    }

    @GetMapping("/{id}")
    fun getProduct(
        @PathVariable
        id: Int
    ): ProductDTO {
        return productRepository.findById(id).map {
            ProductDTO(it.id!!,
                it.name,
                it.description)
        }.orElseThrow()
    }

    @GetMapping("/{id}/variant")
    fun getProductVariants(
        @PathVariable
        id: Int
    ): List<ProductVariantDTO> {
        return productRepository.findById(id)
            .map { it.variants.map { variant -> ProductVariantDTO(variant.id!!, variant.name, variant.description) } }
            .orElseThrow()
    }

    @PostMapping("/")
    fun createProduct(
        @RequestBody
        request: CreateProductRequest
    ): ProductDTO {
        val product = Product(name = request.name, description = request.description)
        return productRepository.save(product).let { ProductDTO(it.id!!, it.name, it.description) }
    }

    @PostMapping("/{id}/variant")
    fun createProductVariant(
        @PathVariable
        id: Int,
        @RequestBody
        request: CreateProductVariantRequest
    ): ProductVariantDTO {
        val product = productRepository.findById(id).orElseThrow()
        val variant = ProductVariant(name = request.name, description = request.description, product = product)
        return productVariantRepository.save(variant).let { ProductVariantDTO(it.id!!, it.name, it.description) }
    }

}