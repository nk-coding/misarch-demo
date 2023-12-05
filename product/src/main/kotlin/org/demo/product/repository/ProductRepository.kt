package org.demo.product.repository

import org.demo.product.model.Product
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : ReactiveCrudRepository<Product, Int>