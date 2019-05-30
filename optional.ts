class Optional<T> {
  public static some = <T>(value: T): Optional<T> =>
    value === null || value === undefined
      ? new Optional<T>(value)
      : new Optional<T>(null);

  public static none = <T>(): Optional<T> => new Optional(null);

  private val: T = null;
  private constructor(value: T) {
    this.val = value;
  }

  public isNone = (): boolean => this.val === null || this.val === undefined;
  public isSome = (): boolean => !this.isNone();

  public unwrap = (): T => {
    if (this.isSome()) {
      return this.val;
    } else {
      throw new Error('This is None');
    }
  };

  public unwrapOr = (def: T): T => (this.isSome() ? this.val : def);

  public map = <T2>(action: (value: T) => T2): Optional<T2> =>
    this.isSome() ? Optional.some(action(this.val)) : Optional.none();

  public mapp = async <T2>(action: (val: T) => Promise<T2>): Promise<Optional<T2>> =>
    this.isSome() ? Optional.some(await action(this.val)) : Optional.none();

  public mapOr = <T2>(def: T, action: (value: T) => T2): Optional<T2> =>
    this.isSome() ? Optional.some(action(this.val)) : Optional.some(action(def));
}

export default Optional;
