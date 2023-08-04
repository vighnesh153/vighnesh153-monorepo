interface SPLExample {
  id: string;
  name: string;
  code: string;
}

export const examples: SPLExample[] = [
  {
    id: 'is-prime',
    name: 'Is Prime?',
    code: `
define function isPrime with arguments [ number n ] which returns boolean:
    if n <= 3, then do:
        return n > 1
    
    if n%2 == 0 or n%3 == 0, then do:
        return false
    
    let number i be 5
    loop while i*i <= n:
        let number nModI be n % i
        let number nModIPlus2 be n % (i + 2)
        if nModI == 0 or nModIPlus2 == 0, then do:
            return false
        
        set i to i + 6
    
    return true

let number num be 1
loop while num <= 50:
    let boolean answer be result of isPrime(num)
    display num, ': ', answer
    set num to num + 1
`,
  },
  {
    id: 'factorial',
    name: 'Factorial',
    code: `
define function factorial with arguments [ number n ] which returns number:
    if n == 0 or n == 1, then do:
        return n
    
    let number factNMinus1 be result of factorial(n - 1)
    return n * factNMinus1

        
let number num be 1
loop while num <=10:
    let number res be result of factorial(num)
    display num, ' factorial is ', res
    set num to num + 1
`,
  },
  {
    id: 'fibonacci-number',
    name: 'Fibonacci number',
    code: `
define function fibonacci with arguments [number n] which returns number:
  if n == 0, then do:
      return 0
  
  if n == 1, then do:
      return 1
  
  let number fibN_take_1 be result of fibonacci(n - 1)
  let number fibN_take_2 be result of fibonacci(n - 2)
  
  return fibN_take_1 + fibN_take_2


let array of number, fibNums, be []
let number i be 0
loop while true:
  let number ithFibNum be result of fibonacci(i)
  if ithFibNum > 100, then do:
      break
  push ithFibNum into fibNums
  set i to i + 1

display 'Fibonacci numbers less than 100 are '
for every fibNum in fibNums:
    display fibNum
`,
  },
  {
    id: 'sort',
    name: 'Sort',
    code: `
define function bubbleSort with arguments [ array of number arr ] which returns array of number:
    let number i be 0
    let number arrLen be length of arr
    loop while i < arrLen:
        let number j be 0
        loop while j+1 < arrLen:
            if arr[j+1] < arr[j], then do:
                let number temp be arr[j]
                set arr[j] to arr[j+1]
                set arr[j+1] to temp
            set j to j + 1
        set i to i + 1
    return arr

let array of number, myNumberArray, be [ 34, 42, 12, 45, 64, 22, 21, 43, 2, 23, 1, 0]
let array of number, sortedArray, be result of bubbleSort(myNumberArray)
display sortedArray
  `,
  },
  {
    id: 'nested-loops',
    name: 'Nested Loops',
    code: `
loop for 5 times with i as counter:
    loop for 6 times with j as counter:
        loop for 7 times with k as counter:
            display i, ', ', j, ', ', k
  `,
  },
  {
    id: 'fizzbuzz',
    name: 'FizzBuzz',
    code: `
define function fizzBuzz with arguments [ number n ] which returns nothing:
    loop for n times with i as counter:
        if i%15 == 0, then do:
            display 'FizzBuzz'
        else if i%3 == 0, then do:
            display 'Fizz'
        else if i%5 == 0, then do:
            display 'Buzz'
        else, do:
            display i


execute fizzBuzz(20)
  `,
  },
];
