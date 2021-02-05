var a = '2223331111'

var b = a.replace(/2/g, function(word) {
    console.log(word);
    return '9999'
})

console.log(b);