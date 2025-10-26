interface IError {
  error?: {
    message: string;
  };
}

export const handleAPIError = (result: unknown) => {
  throw new Error((result as IError).error?.message || "Something went wrong");
};
