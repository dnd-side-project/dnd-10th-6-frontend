export enum ERROR_TYPE {
  NOT_IMPLIMENT = 'NOT_IMPLIMENT',
  BAD_REQUEST_ERROR = 'BAD_REQUEST_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

/**
 * @description 남의위키 베이스 에러 클래스
 */
export class NamuiError extends Error {
  public static readonly message: string
  constructor(
    public readonly message: string,
    protected readonly options: ErrorOptions,
  ) {
    super(message, options)
  }
}

export class NotImplimentError extends NamuiError {
  public name = ERROR_TYPE.NOT_IMPLIMENT

  constructor(
    public readonly message: string = '쉿 구현중!',
    protected readonly options: ErrorOptions = {
      cause: ERROR_TYPE.NOT_IMPLIMENT,
    },
  ) {
    super(message, options)
  }
}

export class BadRequestError extends NamuiError {
  public name = ERROR_TYPE.BAD_REQUEST_ERROR

  constructor(
    public readonly message: string = '서비스가 원할하지 않습니다.',
    protected readonly options: ErrorOptions = {
      cause: ERROR_TYPE.BAD_REQUEST_ERROR,
    },
  ) {
    super(message, options)
  }
}
export class UnauthorizedError extends NamuiError {
  public name = ERROR_TYPE.UNAUTHORIZED

  constructor(
    public readonly message: string = '권한이 없어요.',
    protected readonly options: ErrorOptions = {
      cause: ERROR_TYPE.UNAUTHORIZED,
    },
  ) {
    super(message, options)
  }
}

export class InternalServerError extends NamuiError {
  public name = ERROR_TYPE.INTERNAL_SERVER_ERROR

  constructor(
    public readonly message: string = '서비스에 문제가 발생했어요.',
    protected readonly options: ErrorOptions = {
      cause: ERROR_TYPE.INTERNAL_SERVER_ERROR,
    },
  ) {
    super(message, options)
  }
}

/**
 *
 * @param obj 남의위키 에러 인스턴스 확인 파라미터
 * @returns {boolean} 남의위키 에러 인스턴스면 true
 */
export const isNamuiError = (obj: unknown): obj is NamuiError => {
  return obj instanceof NamuiError
}

export const raiseNamuiErrorFromStatus = (
  status: number = 500,
  isReturned: boolean = false,
) => {
  const parsedError = (error: NamuiError) => {
    if (isReturned) return error
    throw error
  }
  switch (true) {
    case !status:
      parsedError(new InternalServerError())
      break
    case status === 401:
      parsedError(new UnauthorizedError())
      break
    case status && status > 401 && status < 500:
      parsedError(new BadRequestError())
      break
    default:
      parsedError(new InternalServerError())
      break
  }
}
