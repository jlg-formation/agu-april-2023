import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  it('create an instance', () => {
    const pipe = new EllipsisPipe();
    expect(pipe).toBeTruthy();
  });
  it('throw an error if not a string', () => {
    const pipe = new EllipsisPipe();
    let shouldGoHere = false;
    try {
      pipe.transform({});
    } catch (err) {
      shouldGoHere = true;
    }
    expect(shouldGoHere).toBe(true);
  });
  it('test a long string', () => {
    const pipe = new EllipsisPipe();
    const result = pipe.transform('toto', 2);
    expect(result).toBe('to...');
  });
  it('test a short string', () => {
    const pipe = new EllipsisPipe();
    const result = pipe.transform('toto', 5);
    expect(result).toBe('toto');
  });
});
