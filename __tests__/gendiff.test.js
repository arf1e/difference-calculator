import generateDifference from '../src/generateDifference.js';

test('JSON | gendiff from two one-level deep objects', () => {
  expect(generateDifference('__fixtures__/cases/file1.json', '__fixtures__/cases/file2.json')).toStrictEqual({
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

  expect(generateDifference('__fixtures__/cases/file1.json', '__fixtures__/cases/file3.json')).toStrictEqual({
    '- budget': 5000,
    '- description': 'badly coded dating mobile app for weirdos',
    '- domain': 'tellr.ru',
    '- users': 1,
    '+ version': 1,
  });

  expect(generateDifference('__fixtures__/cases/file3.json', '__fixtures__/cases/file3.json')).toStrictEqual({
    '  version': 1,
  });
});

test('YAML | gendiff from two one-level deep objects', () => {
  expect(generateDifference('__fixtures__/cases/file1.yml', '__fixtures__/cases/file2.yml')).toStrictEqual({
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

  expect(generateDifference('__fixtures__/cases/file1.yml', '__fixtures__/cases/file3.yml')).toStrictEqual({
    '- budget': 5000,
    '- description': 'badly coded dating mobile app for weirdos',
    '- domain': 'tellr.ru',
    '- users': 1,
    '+ version': 1,
  });
});

test('JSON/YAML | gendiff from two one-level deep objects', () => {
  expect(generateDifference('__fixtures__/cases/file1.yml', '__fixtures__/cases/file2.json')).toStrictEqual({
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
});
