const a = [[1,2,3], ['a', 'b', 'c']]
const [b, c] = a
console.log(b, c)

const p = {
    aName: 'some',
    age: 12
}


// error handling
function divide(a,b){
    if (b===0){
        throw new Error("Not good")
    }
    return a/b
}
try{
    divide(10, 0)
}catch(error){
    console.log(error.message)
}