import { v4 as uuidv4, validate } from 'uuid';

class Id {
  public value: string;

  constructor(value: string) {
    const isValid = validate(value);

    if (!isValid) {
      throw new Error('Invalid UUID');
    }

    this.value = value;
  }

  static generate(): Id {
    return new Id(uuidv4());
  }
}

export { Id };
