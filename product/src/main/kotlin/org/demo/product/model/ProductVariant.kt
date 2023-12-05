package org.demo.product.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.MapsId

@Entity
class ProductVariant(
    val name: String,
    val description: String,
    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "product_id")
    val product: Product,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?=null,
)