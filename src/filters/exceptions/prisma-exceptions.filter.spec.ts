import { PrismaExceptionsFilter } from './prisma-exceptions.filter';

describe('PrismaExceptionsFilter', () => {
  let prismaExceptionsFilter;

  const host = {
    switchToHttp: jest.fn().mockReturnValue({
      getResponse: jest.fn().mockReturnValue({
        status: jest.fn().mockReturnValue({
          json: jest.fn(),
        }),
      }),
    }),
  } as any;

  beforeEach(() => {
    prismaExceptionsFilter = new PrismaExceptionsFilter();
  });

  it('should return the default unexpected eror', () => {
    const exception = {
      code: 'invalid',
    } as any;
    prismaExceptionsFilter.catch(exception, host);
    expect(host.switchToHttp().getResponse().status).toHaveBeenCalledWith(500);
    expect(
      host.switchToHttp().getResponse().status().json,
    ).toHaveBeenCalledWith({
      statusCode: 500,
      message: ['Unexpected error'],
      error: 'Error',
    });
  });

  it('should return the conflict error', () => {
    const exception = {
      meta: { target: 'email' },
      code: 'P2002',
    } as any;
    prismaExceptionsFilter.catch(exception, host);
    expect(host.switchToHttp().getResponse().status).toHaveBeenCalledWith(409);
    expect(
      host.switchToHttp().getResponse().status().json,
    ).toHaveBeenCalledWith({
      statusCode: 409,
      message: ['Unique constraint violation: email'],
      error: 'Conflict',
    });
  });
});
