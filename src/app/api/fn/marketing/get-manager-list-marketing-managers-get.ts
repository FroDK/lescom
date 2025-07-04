/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

export interface GetManagerListMarketingManagersGet$Params {
  start: string;
  end: string;
}

export function getManagerListMarketingManagersGet(
  http: HttpClient,
  rootUrl: string,
  params: GetManagerListMarketingManagersGet$Params,
  context?: HttpContext,
): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, getManagerListMarketingManagersGet.PATH, 'get');
  if (params) {
    rb.query('start', params.start, {});
    rb.query('end', params.end, {});
  }

  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    }),
  );
}

getManagerListMarketingManagersGet.PATH = '/marketing/managers';
