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
