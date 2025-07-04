/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

import { BodyCreateCommentAsTaskCommentsPost } from '../models/body-create-comment-as-task-comments-post';

export interface CreateCommentAsTaskCommentsPost$Params {
  body: BodyCreateCommentAsTaskCommentsPost;
}

export function createCommentAsTaskCommentsPost(
  http: HttpClient,
  rootUrl: string,
  params: CreateCommentAsTaskCommentsPost$Params,
  context?: HttpContext,
): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, createCommentAsTaskCommentsPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({
        body: parseFloat(String((r as HttpResponse<any>).body)),
      }) as StrictHttpResponse<number>;
    }),
  );
}

createCommentAsTaskCommentsPost.PATH = '/comments/';
