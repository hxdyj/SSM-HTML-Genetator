// tid--->Tid
function firstWordUpper(word) {
	return word.substring(0, 1).toUpperCase() + word.substring(1, word.length)
}

module.exports = {
	firstWordUpper
}
