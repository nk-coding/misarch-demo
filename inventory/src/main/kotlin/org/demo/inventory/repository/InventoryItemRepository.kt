package org.demo.inventory.repository

import org.demo.inventory.model.InventoryItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface InventoryItemRepository : CrudRepository<InventoryItem, Int> {

    fun findAllByproductVersionId(productVersionId: Int): List<InventoryItem>

}