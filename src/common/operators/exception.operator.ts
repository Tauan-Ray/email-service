import { Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, Observable, of, OperatorFunction } from 'rxjs';
import { CustomCatchOperatorResponse } from './interfaces/exception-operator.interface';

export const customCatchOperator = (
  logger: Logger,
): OperatorFunction<any, any> => {
  return catchError(
    (err: AxiosError): Observable<CustomCatchOperatorResponse> => {
      const error = err?.response?.data
        ? JSON.stringify(err.response.data)
        : err;
      const errorMessage = `Ocorreu um erro na chamada de API: ${error}`;

      const response = {
        data: {
          error: err?.response?.data || err?.toString(),
        },
      };

      if (!err?.response || err?.response?.status >= 500)
        logger.error(!err?.response ? err?.stack : errorMessage);
      else logger.warn(errorMessage);

      return of(response);
    },
  );
};
