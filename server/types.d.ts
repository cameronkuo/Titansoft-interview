type Either<T, U> =
  | ({
      [K in keyof T]: T[K];
    } & {
      [K in keyof U]?: never;
    })
  | ({
      [K in keyof U]: U[K];
    } & {
      [K in keyof T]?: never;
    });
