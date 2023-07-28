import { parseCodeOperators } from './parseCodeOperators';

const javascriptOperators = {
  operators: '~!@#$%^&*()-_=+{[}]|\\:;<,>.?/',
};

test('no operators in code', () => {
  expect(parseCodeOperators('pikachu', javascriptOperators)).toStrictEqual([
    {
      isOperator: false,
      value: 'pikachu',
    },
  ]);
});

test('operators', () => {
  expect(parseCodeOperators(' @!# 3s', javascriptOperators)).toStrictEqual([
    {
      isOperator: false,
      value: ' ',
    },
    {
      isOperator: true,
      value: '@!#',
    },
    {
      isOperator: false,
      value: ' 3s',
    },
  ]);
});
