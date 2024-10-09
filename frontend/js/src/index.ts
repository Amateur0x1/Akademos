function add(a: number, b: number) {
  return a + b;
}

// Test
import { expect } from 'chai';

describe('Math Functions', () => {
  it('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).to.equal(5);
  });
});
