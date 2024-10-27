package interpreters.javalang.common

import kotlin.random.Random

class Library {
    // Generates a random pikachu number
    fun pikachuRandomNumber(): String {
        return "pikachu-${Random.nextInt(1, 101)}"
    }
}
