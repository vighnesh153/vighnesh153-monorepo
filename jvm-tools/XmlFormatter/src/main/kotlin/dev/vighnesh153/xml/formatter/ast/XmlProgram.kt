package dev.vighnesh153.xml.formatter.ast

class XmlProgram : XmlExpression {
    private val mutableStatements = mutableListOf<XmlExpression>()
    val statements: List<XmlExpression>
        get() = mutableStatements.toList()

    fun addStatement(stmt: XmlExpression) {
        mutableStatements.add(stmt)
    }

    override fun toString(indentationLevel: Int): String =
        mutableStatements.joinToString("\n") { it.toString(indentationLevel) }
}
