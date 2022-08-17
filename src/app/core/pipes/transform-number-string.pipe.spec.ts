import { TransformNumberStringPipe } from './transform-number-string.pipe';

describe('TransformNumberStringPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformNumberStringPipe();
    expect(pipe).toBeTruthy();
  });
});
