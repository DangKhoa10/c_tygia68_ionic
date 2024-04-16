import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { fnGetApiUrl } from '../utils/tools';

interface Payload {
  [key: string]: any;
}

interface ApiResponse<T> {
  code: number;
  success: boolean;
  result: T;
}

interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any | null;
}

@Injectable({
  providedIn: 'root',
})
export class ApiBiexceService {
  constructor(private readonly http: HttpClient) {}

  private getParams(query: Payload = {}) {
    let params: HttpParams = new HttpParams();
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const element = query[key];
        if (Array.isArray(element)) {
          element.forEach((item) => {
            params = params.append(`${key.toString()}[]`, item);
          });
        } else if (typeof element === 'object') {
          for (const k in element) {
            if (Object.prototype.hasOwnProperty.call(element, k)) {
              const v = element[k];
              params = params.append(`${key.toString()}[${k}]`, v);
            }
          }
        } else {
          params = params.append(key.toString(), query[key]);
        }
      }
    }
    return params;
  }

  get<T>(url: string, query: Payload = {}, options?: HttpOptions) {
    options = this._rebuild_options(options);
    return firstValueFrom<T>(
      this.http
        .get<ApiResponse<T>>(this._build_url(url), {
          params: this.getParams(query),
          responseType: 'json',
          ...options,
        })
        .pipe(
          map((response) => {
            if (response.success == false) {
              if (response.code == 403) {
                // showNotificationError(
                //   this.translate.instant('core.auth.permission_denied'),
                // );
              } else if (response.code == 401) {
                // showNotificationError(
                //   this.translate.instant('core.auth.unauthorized'),
                // );
              }
              throw response;
            }
            return response.result;
          })
        )
    );
  }

  post<T>(url: string, payload: Payload = {}, options?: HttpOptions) {
    options = this._rebuild_options(options);
    return firstValueFrom<T>(
      this.http
        .post<ApiResponse<T>>(this._build_url(url), payload, {
          responseType: 'json',
          ...options,
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response;
            return response.result;
          })
        )
    );
  }

  put<T>(url: string, payload: Payload = {}, options?: HttpOptions) {
    options = this._rebuild_options(options);
    return firstValueFrom<T>(
      this.http
        .put<ApiResponse<T>>(this._build_url(url), payload, {
          responseType: 'json',
          ...options,
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response;
            return response.result;
          })
        )
    );
  }

  patch<T>(url: string, payload: Payload = {}, options?: HttpOptions) {
    options = this._rebuild_options(options);
    return firstValueFrom<T>(
      this.http
        .patch<ApiResponse<T>>(this._build_url(url), payload, {
          responseType: 'json',
          ...options,
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response;
            return response.result;
          })
        )
    );
  }

  delete<T>(url: string, options?: HttpOptions) {
    options = this._rebuild_options(options);
    return firstValueFrom<T>(
      this.http
        .delete<ApiResponse<T>>(this._build_url(url), {
          responseType: 'json',
          ...options,
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response;
            return response.result;
          })
        )
    );
  }

  private _build_url(path: string) {
    return fnGetApiUrl(path, true);
  }

  private _rebuild_options(options: HttpOptions = {}) {
    if (!options) options = {};
    options.headers = this._header_options(options.headers);
    if (options.params && !(options.params instanceof HttpParams)) {
      options.params = this.getParams(options.params);
    }
    return options;
  }

  private _header_options(
    _old_headers?: HttpHeaders | { [header: string]: string | string[] }
  ) {
    let headers = new HttpHeaders();
    if (_old_headers != null) {
      if (_old_headers instanceof HttpHeaders) {
        const keys = _old_headers.keys();
        for (const key of keys) {
          headers = headers.set(key, _old_headers.get(key)!);
        }
      } else if (typeof _old_headers == 'object') {
        for (const key in _old_headers) {
          headers = headers.set(key, _old_headers[key]);
        }
      }
    }

    headers = headers.set('X-Locale', 'vi');

    headers = headers.set('X-Country', 'VN');

    // TODO: Add User Token

    // const token = this.authStore.se((state) => state.token);
    return headers;
  }
}
