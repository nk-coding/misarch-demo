package org.demo.inventory.dto.output

import org.demo.inventory.model.InventoryState

data class InventoryItemDTO(
    val id: Int,
    val productVersionId: Int,
    val inventoryState: InventoryState
)