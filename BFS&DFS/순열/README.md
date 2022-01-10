# 문제

서로 다른 정수를 입력받아 가능한 모든 순열을 리턴

<br/>
<br/>

## 풀이

```js
const solution = nums => {
  const answer = [];
  const prevElements = [];

  const dfs = elements => {
    if (elements.length === 0) {
      answer.push([...prevElements]);
    }

    elements.forEach(e => {
      const nextElements = elements.filter(value => value !== e);

      prevElements.push(e);

      dfs(nextElements);

      prevElements.pop();
    });
  };

  dfs(nums);
  return answer;
};

solution([1, 2, 3]);
```
