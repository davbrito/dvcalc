type Listener<S> = (state: Readonly<S>) => void;

type UpdatersMap<S> = Partial<{
  [key: string]: (state: Readonly<S>, ...args: any[]) => S;
}>;

type MakeUpdatersResult<S, T extends UpdatersMap<S>> = {
  [Key in keyof T]: T[Key] extends (
    state: Readonly<S>,
    ...args: infer Args
  ) => S
    ? (...args: Args) => void
    : never;
};

export class Store<S, U extends UpdatersMap<S>> {
  #listeners = new Set<Listener<S>>();
  #state: Readonly<S>;
  #updaters: MakeUpdatersResult<S, U>;
  #runListeners(snapshot: Readonly<S>): void {
    this.#listeners.forEach((listener) => listener(snapshot));
  }

  #makeUpdaters<U extends UpdatersMap<S>>(updatersMap: U) {
    return Object.fromEntries(
      Object.entries(updatersMap).map(([key, value]) => {
        return [
          key,
          (...args: unknown[]) => {
            if (!value) return;
            const oldState = this.#state;
            const newState = value(oldState, ...args);
            if (oldState !== newState) {
              const snapshot = (this.#state = Object.freeze(newState));
              this.#runListeners(snapshot);
            }
          },
        ];
      })
    ) as MakeUpdatersResult<S, U>;
  }

  constructor(initialState: S, updatersMap: U) {
    this.#state = Object.freeze(initialState);
    this.#updaters = this.#makeUpdaters<U>(updatersMap);
  }

  subscribe(listener: Listener<S>): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }
  getState(): Readonly<S> {
    return Object.freeze(this.#state);
  }

  get updaters(): Readonly<MakeUpdatersResult<S, U>> {
    return Object.freeze(this.#updaters);
  }
}
