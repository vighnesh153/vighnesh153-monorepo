package interpreters.javalang.worker

import interpreters.javalang.common.Library
import org.w3c.dom.DedicatedWorkerGlobalScope
import org.w3c.dom.MessageEvent

external val self: DedicatedWorkerGlobalScope

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Request(
    val code: String
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Response(
    val output: String,
    val errors: Array<String>
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Response) return false

        if (output != other.output) return false
        if (!errors.contentEquals(other.errors)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = output.hashCode()
        result = 31 * result + errors.contentHashCode()
        return result
    }
}

fun main() {
    console.log("Worker is running...")
    self.onmessage = onmessage@{ m: MessageEvent ->
        console.log("Received message:", m)
        val data = JSON.parse<Request>(m.data as String)
        console.log("Message.Data=", data)
        val response = Response(
            output = Library().pikachuRandomNumber(),
            errors = arrayOf(),
        )
        console.log("Worker sending message:", response)
        self.postMessage(JSON.stringify(response))
    }
}
