const answer = [];
const inputValue = '23';

const keyPad = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
};

const dfs = (index, path) => {
  if (path.length === inputValue.length) {
    answer.push(path);
    return;
  }

  for (let i = index; i < inputValue.length; i += 1) {
    [...keyPad[inputValue[i]]].forEach(v => {
      dfs(i + 1, path + v);
    });
  }
};

dfs(0, '');
