package dev.vighnesh153.xml.formatter.ast

class XmlPrologNode : XmlExpression {
    private val mutableAttributes = mutableListOf<XmlElementAttribute>()
    val attributes: List<XmlElementAttribute>
        get() = mutableAttributes.toList()

    fun addAttribute(attr: XmlElementAttribute) {
        mutableAttributes.add(attr)
    }

    override fun toString(indentationLevel: Int): String {
        val builder = StringBuilder()
        builder.append(buildIndentation(indentationLevel = indentationLevel))
        builder.append("<?xml")
        for (attr in mutableAttributes) {
            builder.append(" ")
            builder.append(attr.toString())
        }
        builder.append("?>")
        return builder.toString()
    }
}
