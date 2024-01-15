package org.demo.inventory.controller

import io.dapr.Topic
import io.dapr.client.domain.CloudEvent
import org.demo.inventory.dto.output.ProductDTO
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.server.ResponseStatusException

@Controller
class DaprEventController {

    @Topic(name = "product/product/create", pubsubName = "pubsub")
    @PostMapping("/subscription/product/product/create")
    fun onCreateProduct(
        @RequestBody
        cloudEvent: CloudEvent<ProductDTO>
    ): String {
        println(cloudEvent.data)
        return "OK"
    }

}