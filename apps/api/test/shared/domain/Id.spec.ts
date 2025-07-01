import { Id } from '~shared/domain';

describe('Id', () => {
  it('should create an Id instance with a valid UUID', () => {
    const validUuid = '123e4567-e89b-12d3-a456-426614174000';
    const id = new Id(validUuid);

    expect(id).toBeInstanceOf(Id);
    expect(id.value).toBe(validUuid);
  });

  it('should throw an error when creating an Id with an invalid UUID', () => {
    expect(() => new Id('invalid')).toThrow('Invalid UUID');
  });

  it('should generate a new Id instance with a valid UUID', () => {
    const id = Id.generate();

    expect(id).toBeInstanceOf(Id);
  });
});
