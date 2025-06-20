
let input = [3,4,5,7]

function transform(i){
  return i*3
}

const ans = input.map(function transform(i){return i*3})

console.log(ans)


function filteringlogic(i){
  if(i%2 == 0){
    return true
  }
  else{
    return false
  }
}

const newarr = input.filter(filteringlogic)
console.log(newarr)
