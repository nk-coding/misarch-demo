package org.demo.product.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany

@Entity
class Product(
    val name: String,
    val description: String,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?=null,
) {

    @OneToMany(mappedBy = "product")
    var variants: Set<ProductVariant> = mutableSetOf()

}