package interpreters.javalang.common.lexer

internal fun Char.isUnderscore(): Boolean = this == '_'

internal fun Char.isAcceptableIdentifierStart(): Boolean = isUnderscore() || isLetter()

internal fun Char.isAcceptableIdentifierNonStart(): Boolean = isAcceptableIdentifierStart() || isDigit()
