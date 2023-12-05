package org.demo.product.controller

import kotlinx.coroutines.reactor.awaitSingle
import org.demo.product.dto.input.CreateProductRequest
import org.demo.product.dto.input.CreateProductVariantRequest
import org.demo.product.dto.output.ProductDTO
import org.demo.product.dto.output.ProductDetailDTO
import org.demo.product.dto.output.ProductVariantDTO
import org.demo.product.model.Product
import org.demo.product.model.ProductVariant
import org.demo.product.repository.ProductRepository
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux

@RestController
@RequestMapping("/product")
class ProductController(
    val productRepository: ProductRepository,
) {

    @GetMapping("/")
    suspend fun getProducts(): Flux<ProductDTO> {
        return productRepository.findAll().map { ProductDTO(it.id!!, it.name, it.description) }
    }

    @GetMapping("/{id}")
    suspend fun getProduct(
        @PathVariable
        id: Int
    ): ProductDetailDTO {
        return productRepository.findById(id).map {
            ProductDetailDTO(it.id!!,
                it.name,
                it.description,
                it.variants.map { variant -> ProductVariantDTO(variant.id!!, variant.name, variant.description) })
        }.block()!!
    }

    @GetMapping("/{id}/variant")
    suspend fun getProductVariants(
        @PathVariable
        id: Int
    ): List<ProductVariantDTO> {
        return productRepository.findById(id)
            .map { it.variants.map { variant -> ProductVariantDTO(variant.id!!, variant.name, variant.description) } }
            .awaitSingle()
    }

    @PostMapping("/")
    suspend fun createProduct(
        @RequestBody
        request: CreateProductRequest
    ): ProductDTO {
        val product = Product(name = request.name, description = request.description)
        return productRepository.save(product).map { ProductDTO(it.id!!, it.name, it.description) }.block()!!
    }

    @PostMapping("/{id}/variant")
    suspend fun createProductVariant(
        @PathVariable
        id: Int,
        @RequestBody
        request: CreateProductVariantRequest
    ): ProductVariantDTO {
        val product = productRepository.findById(id).awaitSingle()
        val variant = ProductVariant(name = request.name, description = request.description, product = product)
        return productRepository.save(product).map { ProductVariantDTO(it.id!!, it.name, it.description) }.awaitSingle()
    }

}