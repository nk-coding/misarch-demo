package org.demo.product.repository

import org.demo.product.model.ProductVariant
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductVariantRepository : CrudRepository<ProductVariant, Int>