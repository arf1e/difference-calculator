import generateDifference from '../src/generateDifference.js';

test('Should return difference between two one-level deep objects', () => {
  expect(generateDifference('__fixtures__/file1.json', '__fixtures__/file2.json')).toStrictEqual({
    '- budget': 5000,
    '+ budget': 0,
    '- description': 'badly coded dating mobile app for weirdos',
    '+ description': "famous philosopher's quote-of-the-day web-app",
    '- domain': 'tellr.ru',
    '+ domain': 'xanaxed-quotes.me',
    '+ mascot': 'pablo technician',
    '+ version': 'alpha1.4',
    '- users': 1,
  });

  expect(generateDifference('__fixtures__/file1.json', '__fixtures__/file3.json')).toStrictEqual({
    '- budget': 5000,
    '- description': 'badly coded dating mobile app for weirdos',
    '- domain': 'tellr.ru',
    '- users': 1,
    '+ version': 1,
  });

  expect(generateDifference('__fixtures__/file3.json', '__fixtures__/file3.json')).toStrictEqual({
    '  version': 1,
  });
});
