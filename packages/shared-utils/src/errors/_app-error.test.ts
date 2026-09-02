import { AppError } from "./_app-error";

describe("AppError", () => {
  it("creates an error with the provided message and kind", () => {
    const error = new AppError({
      kind: "VALIDATION_ERROR",
      message: "Invalid input",
    });

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);

    expect(error.message).toBe("Invalid input");
    expect(error.kind).toBe("VALIDATION_ERROR");
    expect(error.name).toBe("AppError");
  });

  it("preserves the error cause", () => {
    const cause = new Error("Database connection failed");

    const error = new AppError({
      kind: "DATABASE_ERROR",
      message: "Unable to load user",
      cause,
    });

    expect(error.cause).toBe(cause);
  });

  it("preserves the provided context", () => {
    const context = {
      userId: "user-123",
      operation: "load-user",
      retryCount: 2,
    };

    const error = new AppError({
      kind: "USER_LOAD_ERROR",
      message: "Unable to load user",
      context,
    });

    expect(error.context).toBe(context);
  });

  it("allows context and cause to be omitted", () => {
    const error = new AppError({
      kind: "UNKNOWN_ERROR",
      message: "Something went wrong",
    });

    expect(error.context).toBeUndefined();
    expect(error.cause).toBeUndefined();
  });

  it("uses the subclass name as the error name", () => {
    class UserNotFoundError extends AppError {}

    const error = new UserNotFoundError({
      kind: "USER_NOT_FOUND",
      message: "User was not found",
    });

    expect(error.name).toBe("UserNotFoundError");
    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(Error);
  });
});
