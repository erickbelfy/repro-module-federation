import 'jest-extended';

describe('test setup', () => {
  it('is defined correctly', () => {
    expect(true).toEqual(true);
  });

  it('uses jest-extended', () => {
    const x = {};
    expect(x).toEqual({});
  });
});
