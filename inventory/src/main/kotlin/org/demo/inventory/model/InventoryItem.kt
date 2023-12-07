package org.demo.inventory.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany

@Entity
class InventoryItem(
    val productVersionId: Int,
    val inventoryState: InventoryState,
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int?=null,
)