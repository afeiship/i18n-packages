describe('utils tests: warn', () => {
  test('01/warn', () => {
    const tmpl = 'Just a test, I will inject a %s here';
    const expected = `Just a test, I will inject a var1 here`;
    console.log(tmpl, 'var1');
    // expect(actual).toBe(expected);
  });
});
