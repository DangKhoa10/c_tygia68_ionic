import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { isURL } from 'class-validator'
import { firstValueFrom, map } from 'rxjs'
import { environment } from 'src/environments/environment'
import { fnGetApiUrl } from '../utils/tools'

interface Payload {
  [key: string]: any
}

interface ApiResponse<T> {
  code: number
  success: boolean
  result: T
}

interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[]
      }
  context?: HttpContext
  observe?: 'body'
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
      }
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
  body?: any | null
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly _http: HttpClient) {}

  get http(): HttpClient {
    return this._http
  }

  private getParams(query: Payload = {}) {
    let params: HttpParams = new HttpParams()
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const element = query[key]
        if (Array.isArray(element)) {
          element.forEach((item) => {
            params = params.append(`${key.toString()}[]`, item)
          })
        } else if (typeof element === 'object') {
          for (const k in element) {
            if (Object.prototype.hasOwnProperty.call(element, k)) {
              const v = element[k]
              params = params.append(`${key.toString()}[${k}]`, v)
            }
          }
        } else {
          params = params.append(key.toString(), query[key])
        }
      }
    }
    return params
  }

  get<T>(url: string, query: Payload = {}, options?: HttpOptions) {
    const searchParams = new URLSearchParams(query)

    options = this._rebuild_options(options)
    // console.log('this._build_url(url) :>> ', this._build_url(url));
    return firstValueFrom<T>(
      this._http
        .get<ApiResponse<T>>(this._build_url(url), {
          params: this.getParams(query),
          responseType: 'json',
          ...options
        })
        .pipe(
          map((response) => {
            if (response.success == false) {
              if (response.code == 403) {
                //notify access denied
              } else if (response.code == 401) {
                //notify unauthorized
              }
              throw response
            }
            return response.result
          })
        )
    )
  }

  post<T>(url: string, payload: Payload = {}, options?: HttpOptions) {
    options = this._rebuild_options(options)
    return firstValueFrom<T>(
      this._http
        .post<ApiResponse<T>>(this._build_url(url), payload, {
          responseType: 'json',
          ...options
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response
            return response.result
          })
        )
    )
  }

  put<T>(url: string, payload: Payload = {}, options?: HttpOptions) {
    options = this._rebuild_options(options)
    return firstValueFrom<T>(
      this._http
        .put<ApiResponse<T>>(this._build_url(url), payload, {
          responseType: 'json',
          ...options
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response
            return response.result
          })
        )
    )
  }

  patch<T>(url: string, payload: Payload = {}, options?: HttpOptions) {
    options = this._rebuild_options(options)
    return firstValueFrom<T>(
      this._http
        .patch<ApiResponse<T>>(this._build_url(url), payload, {
          responseType: 'json',
          ...options
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response
            return response.result
          })
        )
    )
  }

  delete<T>(url: string, options?: HttpOptions) {
    options = this._rebuild_options(options)
    return firstValueFrom<T>(
      this._http
        .delete<ApiResponse<T>>(this._build_url(url), {
          responseType: 'json',
          ...options
        })
        .pipe(
          map((response) => {
            if (response.success == false) throw response
            return response.result
          })
        )
    )
  }

  private _build_url(path: string) {
    return fnGetApiUrl(path)
  }

  private _rebuild_options(options: HttpOptions = {}) {
    if (!options) options = {}
    options.headers = this._header_options(options.headers)
    if (options.params && !(options.params instanceof HttpParams)) {
      options.params = this.getParams(options.params)
    }
    return options
  }

  private _header_options(_old_headers?: HttpHeaders | { [header: string]: string | string[] }) {
    let headers = new HttpHeaders()
    if (_old_headers != null) {
      if (_old_headers instanceof HttpHeaders) {
        const keys = _old_headers.keys()
        for (const key of keys) {
          headers = headers.set(key, _old_headers.get(key)!)
        }
      } else if (typeof _old_headers == 'object') {
        for (const key in _old_headers) {
          headers = headers.set(key, _old_headers[key])
        }
      }
    }

    // const token = this.authStore.se((state) => state.token);
    // console.log(token);
    return headers
  }
}
