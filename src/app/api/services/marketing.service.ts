/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { StrictHttpResponse } from '../strict-http-response';

import {
  getManagerListMarketingManagersGet,
  GetManagerListMarketingManagersGet$Params,
} from '../fn/marketing/get-manager-list-marketing-managers-get';
import {
  getUtmListMarketingUtmGet,
  GetUtmListMarketingUtmGet$Params,
} from '../fn/marketing/get-utm-list-marketing-utm-get';

@Injectable({ providedIn: 'root' })
export class MarketingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUtmListMarketingUtmGet()` */
  static readonly GetUtmListMarketingUtmGetPath = '/marketing/utm';

  /**
   * Получения списка utm-меток.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUtmListMarketingUtmGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUtmListMarketingUtmGet$Response(
    params: GetUtmListMarketingUtmGet$Params,
    context?: HttpContext,
  ): Observable<StrictHttpResponse<any>> {
    return getUtmListMarketingUtmGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Получения списка utm-меток.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUtmListMarketingUtmGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUtmListMarketingUtmGet(
    params: GetUtmListMarketingUtmGet$Params,
    context?: HttpContext,
  ): Observable<any> {
    return this.getUtmListMarketingUtmGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body),
    );
  }

  /** Path part for operation `getManagerListMarketingManagersGet()` */
  static readonly GetManagerListMarketingManagersGetPath = '/marketing/managers';

  /**
   * Получения списка менеджеров.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getManagerListMarketingManagersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getManagerListMarketingManagersGet$Response(
    params: GetManagerListMarketingManagersGet$Params,
    context?: HttpContext,
  ): Observable<StrictHttpResponse<any>> {
    return getManagerListMarketingManagersGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Получения списка менеджеров.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getManagerListMarketingManagersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getManagerListMarketingManagersGet(
    params: GetManagerListMarketingManagersGet$Params,
    context?: HttpContext,
  ): Observable<any> {
    return this.getManagerListMarketingManagersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body),
    );
  }
}
