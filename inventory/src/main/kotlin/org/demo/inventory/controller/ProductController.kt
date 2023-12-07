package org.demo.inventory.controller

import org.demo.inventory.dto.output.InventoryItemDTO
import org.demo.inventory.model.InventoryItem
import org.demo.inventory.model.InventoryState
import org.demo.inventory.repository.InventoryItemRepository
import org.springframework.http.HttpStatusCode
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestClient
import java.lang.IllegalArgumentException

@RestController
@RequestMapping("/product")
class ProductController(
    val inventoryItemRepository: InventoryItemRepository,
) {

    @GetMapping("/{id}/inventory")
    fun getInventoryItems(
        @PathVariable
        id: Int
    ): List<InventoryItemDTO> {
        return inventoryItemRepository.findAllByproductVersionId(id)
            .map { InventoryItemDTO(it.id!!, it.productVersionId, it.inventoryState) }
    }

    @PostMapping("/{id}/inventory")
    fun createInventoryItem(
        @PathVariable
        id: Int
    ): InventoryItemDTO {
        RestClient.create().get().uri("http://product:8080/product/$id").retrieve().onStatus(HttpStatusCode::isError) { _, _ ->
            throw IllegalArgumentException("Invalid product id")
        }
        val item = InventoryItem(id, InventoryState.AVAILABLE)
        return inventoryItemRepository.save(item).let { InventoryItemDTO(it.id!!, it.productVersionId, it.inventoryState) }
    }

}