package org.demo.product.controller

import io.dapr.client.DaprClient
import io.dapr.client.DaprClientBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class DaprConfiguration {

    @Bean
    fun daprClient(): DaprClient {
        return DaprClientBuilder().build()
    }

}