import { Main } from '@/main';
import { Scope } from '@/models/Scope';

describe('check some sample programs.', () => {
  test('should print all multiples of 2 between 1 and 11.', () => {
    const code = `
let number i be 1
let array of number, arr, be []


loop while i <= 11:

    if i%2 == 0, then do:
        push i into arr

    set i to i + 1


display arr    
    
`;
    const main = new Main(code);
    main.compile(new Scope());

    expect(main.getOutput()).toStrictEqual('2,4,6,8,10\n');
  });

  test('should print fibonacci numbers less than 1000..', () => {
    const code = `


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

display fibNums

`;
    const main = new Main(code);
    main.compile(new Scope());

    expect(main.getOutput()).toStrictEqual('0,1,1,2,3,5,8,13,21,34,55,89\n');
  });

  test('should print prime numbers.', () => {
    const code = `


define function isPrime with arguments [ number n ] which returns boolean:
\tif n <= 3, then do:
\t\treturn n > 1
\t
\tif n%2 == 0 or n%3 == 0, then do:
\t\treturn false
\t
\tlet number i be 5
\tloop while i*i <= n:
\t\tlet number nModI be n % i
\t\tlet number nModIPlus2 be n % (i + 2)
\t\tif nModI == 0 or nModIPlus2 == 0, then do:
\t\t\treturn false
\t\t
\t\tset i to i + 6
\t
\treturn true

let number num be 1
loop while num <= 50:
\tlet boolean answer be result of isPrime(num)
\tdisplay num, ': ', answer
\tset num to num + 1


`;
    const main = new Main(code);
    main.compile(new Scope());

    expect(main.getOutput()).toStrictEqual(
      '1: false\n' +
        '2: true\n' +
        '3: true\n' +
        '4: false\n' +
        '5: true\n' +
        '6: false\n' +
        '7: true\n' +
        '8: false\n' +
        '9: false\n' +
        '10: false\n' +
        '11: true\n' +
        '12: false\n' +
        '13: true\n' +
        '14: false\n' +
        '15: false\n' +
        '16: false\n' +
        '17: true\n' +
        '18: false\n' +
        '19: true\n' +
        '20: false\n' +
        '21: false\n' +
        '22: false\n' +
        '23: true\n' +
        '24: false\n' +
        '25: false\n' +
        '26: false\n' +
        '27: false\n' +
        '28: false\n' +
        '29: true\n' +
        '30: false\n' +
        '31: true\n' +
        '32: false\n' +
        '33: false\n' +
        '34: false\n' +
        '35: false\n' +
        '36: false\n' +
        '37: true\n' +
        '38: false\n' +
        '39: false\n' +
        '40: false\n' +
        '41: true\n' +
        '42: false\n' +
        '43: true\n' +
        '44: false\n' +
        '45: false\n' +
        '46: false\n' +
        '47: true\n' +
        '48: false\n' +
        '49: false\n' +
        '50: false\n'
    );
  });

  test('should find the factorial of numbers.', () => {
    const code = `
define function factorial with arguments [ number n ] which returns number:
\tif n == 0 or n == 1, then do:
\t\treturn n
\t
\tlet number factNMinus1 be result of factorial(n - 1)
\treturn n * factNMinus1

\t\t
let number num be 1
loop while num <=10:
\tlet number res be result of factorial(num)
\tdisplay num, ' factorial is ', res
\tset num to num + 1

`;
    const main = new Main(code);
    main.compile(new Scope());

    expect(main.getOutput()).toStrictEqual(
      '1 factorial is 1\n' +
        '2 factorial is 2\n' +
        '3 factorial is 6\n' +
        '4 factorial is 24\n' +
        '5 factorial is 120\n' +
        '6 factorial is 720\n' +
        '7 factorial is 5040\n' +
        '8 factorial is 40320\n' +
        '9 factorial is 362880\n' +
        '10 factorial is 3628800\n'
    );
  });

  test('should sort the array of numbers.', () => {
    const code = `
define function bubbleSort with arguments [ array of number arr ] which returns array of number:
\tlet number i be 0
\tlet number arrLen be length of arr
\tloop while i < arrLen:
\t\tlet number j be 0
\t\tloop while j+1 < arrLen:
\t\t\tif arr[j+1] < arr[j], then do:
\t\t\t\tlet number temp be arr[j]
\t\t\t\tset arr[j] to arr[j+1]
\t\t\t\tset arr[j+1] to temp
\t\t\tset j to j + 1
\t\tset i to i + 1
\treturn arr

let array of number, myNumberArray, be [ 34, 42, 12, 45, 64, 22, 21, 43, 2, 23, 1, 0]
let array of number, sortedArray, be result of bubbleSort(myNumberArray)
display sortedArray

        `;
    // [ 34, 42, 12, 45, 64, 22, 21, 43, 2, 23, 1, 0]
    const main = new Main(code);
    main.compile(new Scope());

    expect(main.getOutput()).toStrictEqual('0,1,2,12,21,22,23,34,42,43,45,64\n');
  });

  test('should evaluate nested loop.', () => {
    const code = `
loop for 5 times with i as counter:
\tloop for 6 times with j as counter:
\t\tloop for 7 times with k as counter:
\t\t\tdisplay i, ', ', j, ', ', k
        `;

    const main = new Main(code);
    main.compile(new Scope());

    expect(main.getOutput()).toStrictEqual(
      '1, 1, 1\n' +
        '1, 1, 2\n' +
        '1, 1, 3\n' +
        '1, 1, 4\n' +
        '1, 1, 5\n' +
        '1, 1, 6\n' +
        '1, 1, 7\n' +
        '1, 2, 1\n' +
        '1, 2, 2\n' +
        '1, 2, 3\n' +
        '1, 2, 4\n' +
        '1, 2, 5\n' +
        '1, 2, 6\n' +
        '1, 2, 7\n' +
        '1, 3, 1\n' +
        '1, 3, 2\n' +
        '1, 3, 3\n' +
        '1, 3, 4\n' +
        '1, 3, 5\n' +
        '1, 3, 6\n' +
        '1, 3, 7\n' +
        '1, 4, 1\n' +
        '1, 4, 2\n' +
        '1, 4, 3\n' +
        '1, 4, 4\n' +
        '1, 4, 5\n' +
        '1, 4, 6\n' +
        '1, 4, 7\n' +
        '1, 5, 1\n' +
        '1, 5, 2\n' +
        '1, 5, 3\n' +
        '1, 5, 4\n' +
        '1, 5, 5\n' +
        '1, 5, 6\n' +
        '1, 5, 7\n' +
        '1, 6, 1\n' +
        '1, 6, 2\n' +
        '1, 6, 3\n' +
        '1, 6, 4\n' +
        '1, 6, 5\n' +
        '1, 6, 6\n' +
        '1, 6, 7\n' +
        '2, 1, 1\n' +
        '2, 1, 2\n' +
        '2, 1, 3\n' +
        '2, 1, 4\n' +
        '2, 1, 5\n' +
        '2, 1, 6\n' +
        '2, 1, 7\n' +
        '2, 2, 1\n' +
        '2, 2, 2\n' +
        '2, 2, 3\n' +
        '2, 2, 4\n' +
        '2, 2, 5\n' +
        '2, 2, 6\n' +
        '2, 2, 7\n' +
        '2, 3, 1\n' +
        '2, 3, 2\n' +
        '2, 3, 3\n' +
        '2, 3, 4\n' +
        '2, 3, 5\n' +
        '2, 3, 6\n' +
        '2, 3, 7\n' +
        '2, 4, 1\n' +
        '2, 4, 2\n' +
        '2, 4, 3\n' +
        '2, 4, 4\n' +
        '2, 4, 5\n' +
        '2, 4, 6\n' +
        '2, 4, 7\n' +
        '2, 5, 1\n' +
        '2, 5, 2\n' +
        '2, 5, 3\n' +
        '2, 5, 4\n' +
        '2, 5, 5\n' +
        '2, 5, 6\n' +
        '2, 5, 7\n' +
        '2, 6, 1\n' +
        '2, 6, 2\n' +
        '2, 6, 3\n' +
        '2, 6, 4\n' +
        '2, 6, 5\n' +
        '2, 6, 6\n' +
        '2, 6, 7\n' +
        '3, 1, 1\n' +
        '3, 1, 2\n' +
        '3, 1, 3\n' +
        '3, 1, 4\n' +
        '3, 1, 5\n' +
        '3, 1, 6\n' +
        '3, 1, 7\n' +
        '3, 2, 1\n' +
        '3, 2, 2\n' +
        '3, 2, 3\n' +
        '3, 2, 4\n' +
        '3, 2, 5\n' +
        '3, 2, 6\n' +
        '3, 2, 7\n' +
        '3, 3, 1\n' +
        '3, 3, 2\n' +
        '3, 3, 3\n' +
        '3, 3, 4\n' +
        '3, 3, 5\n' +
        '3, 3, 6\n' +
        '3, 3, 7\n' +
        '3, 4, 1\n' +
        '3, 4, 2\n' +
        '3, 4, 3\n' +
        '3, 4, 4\n' +
        '3, 4, 5\n' +
        '3, 4, 6\n' +
        '3, 4, 7\n' +
        '3, 5, 1\n' +
        '3, 5, 2\n' +
        '3, 5, 3\n' +
        '3, 5, 4\n' +
        '3, 5, 5\n' +
        '3, 5, 6\n' +
        '3, 5, 7\n' +
        '3, 6, 1\n' +
        '3, 6, 2\n' +
        '3, 6, 3\n' +
        '3, 6, 4\n' +
        '3, 6, 5\n' +
        '3, 6, 6\n' +
        '3, 6, 7\n' +
        '4, 1, 1\n' +
        '4, 1, 2\n' +
        '4, 1, 3\n' +
        '4, 1, 4\n' +
        '4, 1, 5\n' +
        '4, 1, 6\n' +
        '4, 1, 7\n' +
        '4, 2, 1\n' +
        '4, 2, 2\n' +
        '4, 2, 3\n' +
        '4, 2, 4\n' +
        '4, 2, 5\n' +
        '4, 2, 6\n' +
        '4, 2, 7\n' +
        '4, 3, 1\n' +
        '4, 3, 2\n' +
        '4, 3, 3\n' +
        '4, 3, 4\n' +
        '4, 3, 5\n' +
        '4, 3, 6\n' +
        '4, 3, 7\n' +
        '4, 4, 1\n' +
        '4, 4, 2\n' +
        '4, 4, 3\n' +
        '4, 4, 4\n' +
        '4, 4, 5\n' +
        '4, 4, 6\n' +
        '4, 4, 7\n' +
        '4, 5, 1\n' +
        '4, 5, 2\n' +
        '4, 5, 3\n' +
        '4, 5, 4\n' +
        '4, 5, 5\n' +
        '4, 5, 6\n' +
        '4, 5, 7\n' +
        '4, 6, 1\n' +
        '4, 6, 2\n' +
        '4, 6, 3\n' +
        '4, 6, 4\n' +
        '4, 6, 5\n' +
        '4, 6, 6\n' +
        '4, 6, 7\n' +
        '5, 1, 1\n' +
        '5, 1, 2\n' +
        '5, 1, 3\n' +
        '5, 1, 4\n' +
        '5, 1, 5\n' +
        '5, 1, 6\n' +
        '5, 1, 7\n' +
        '5, 2, 1\n' +
        '5, 2, 2\n' +
        '5, 2, 3\n' +
        '5, 2, 4\n' +
        '5, 2, 5\n' +
        '5, 2, 6\n' +
        '5, 2, 7\n' +
        '5, 3, 1\n' +
        '5, 3, 2\n' +
        '5, 3, 3\n' +
        '5, 3, 4\n' +
        '5, 3, 5\n' +
        '5, 3, 6\n' +
        '5, 3, 7\n' +
        '5, 4, 1\n' +
        '5, 4, 2\n' +
        '5, 4, 3\n' +
        '5, 4, 4\n' +
        '5, 4, 5\n' +
        '5, 4, 6\n' +
        '5, 4, 7\n' +
        '5, 5, 1\n' +
        '5, 5, 2\n' +
        '5, 5, 3\n' +
        '5, 5, 4\n' +
        '5, 5, 5\n' +
        '5, 5, 6\n' +
        '5, 5, 7\n' +
        '5, 6, 1\n' +
        '5, 6, 2\n' +
        '5, 6, 3\n' +
        '5, 6, 4\n' +
        '5, 6, 5\n' +
        '5, 6, 6\n' +
        '5, 6, 7\n'
    );
  });

  test('should evaluate the fizz-buzz code.', () => {
    const code = `
define function fizzBuzz with arguments [ number n ] which returns nothing:
\tloop for n times with i as counter:
\t\tif i%15 == 0, then do:
\t\t\tdisplay 'FizzBuzz'
\t\telse if i%3 == 0, then do:
\t\t\tdisplay 'Fizz'
\t\telse if i%5 == 0, then do:
\t\t\tdisplay 'Buzz'
\t\telse, do:
\t\t\tdisplay i

\t\t\t
execute fizzBuzz(20)
 
        `;

    const main = new Main(code);
    main.compile(new Scope());

    expect(main.getOutput()).toStrictEqual(
      '1\n' +
        '2\n' +
        'Fizz\n' +
        '4\n' +
        'Buzz\n' +
        'Fizz\n' +
        '7\n' +
        '8\n' +
        'Fizz\n' +
        'Buzz\n' +
        '11\n' +
        'Fizz\n' +
        '13\n' +
        '14\n' +
        'FizzBuzz\n' +
        '16\n' +
        '17\n' +
        'Fizz\n' +
        '19\n' +
        'Buzz\n'
    );
  });
});
