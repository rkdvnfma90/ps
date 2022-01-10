# 문제

2에서 9까지 숫자가 주어졌을 때 전화 번호로 조합 가능한 모든 문자를 출력

![image](https://user-images.githubusercontent.com/52060742/148711165-df6b310c-2b33-435c-b450-25ed8fba48be.png)

<br/>
<br/>

## 풀이

```js
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
```