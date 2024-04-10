import { AxiosError } from 'axios';

interface ProblemDetails {
  title: string;
  status: number;
  detail: string;
}

export const getErrorString = (err: AxiosError): string => {
  if (err.response?.data) {
    const problemDetails = err.response.data as ProblemDetails;
    return `${problemDetails.detail}`;
  }
  return err.response?.statusText || err.message || JSON.stringify(err);
};
