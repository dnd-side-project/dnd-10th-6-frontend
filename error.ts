export enum ERROR_TYPE {
  NOT_IMPLIMENT = 'NOT_IMPLIMENT',
  BAD_REQUEST_ERROR = 'BAD_REQUEST_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

class NotImplimentError extends Error {
  public readonly name: string = ERROR_TYPE.NOT_IMPLIMENT
  public static readonly message: string = '쉿 구현중!'

  constructor(
    public readonly message: string = NotImplimentError.message,
    private readonly options: ErrorOptions = {
      cause: NotImplimentError.name,
    },
  ) {
    super(message, options)
  }
}

class BadRequestError extends Error {
  public static readonly message: string = '서비스가 원할하지 않습니다.'
  public readonly name: string = ERROR_TYPE.BAD_REQUEST_ERROR

  constructor(
    public readonly message: string = BadRequestError.message,
    private readonly options: ErrorOptions = {
      cause: BadRequestError.name,
    },
  ) {
    super(message, options)
  }
}
class UnauthorizedError extends Error {
  public static readonly message: string = '권한이 없어요.'
  public readonly name: string = ERROR_TYPE.UNAUTHORIZED

  constructor(
    public readonly message: string = BadRequestError.message,
    private readonly options: ErrorOptions = {
      cause: UnauthorizedError.name,
    },
  ) {
    super(message, options)
  }
}

export class NamuiError {
  public static NotImplimentError = NotImplimentError
  public static BadRequestError = BadRequestError
  public static UnauthorizedError = UnauthorizedError
}
