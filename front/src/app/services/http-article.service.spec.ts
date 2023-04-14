import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { newArticle } from 'src/test/article.data';
import { HttpArticleService, url } from './http-article.service';
import { catchError, of } from 'rxjs';

describe('HttpArticleService', () => {
  let service: HttpArticleService;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpArticleService);
    ctrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    ctrl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new article', fakeAsync(() => {
    service.add(newArticle).subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 201, statusText: 'Created' });
    expect(service).toBeTruthy();
  }));

  it('should add a new article in error', fakeAsync(() => {
    let shouldGoHere = false;
    service
      .add(newArticle)
      .pipe(
        catchError(() => {
          shouldGoHere = true;
          return of(undefined);
        })
      )
      .subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 500, statusText: 'Internal Error' });
    flush();
    expect(service).toBeTruthy();
    expect(shouldGoHere).toBe(true);
  }));

  it('should refresh', fakeAsync(() => {
    service.refresh().subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
    expect(service).toBeTruthy();
  }));

  it('should refresh in error', fakeAsync(() => {
    let shouldGoHere = false;
    service
      .refresh()
      .pipe(
        catchError(() => {
          shouldGoHere = true;
          return of(undefined);
        })
      )
      .subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 500, statusText: 'Internal Error' });
    flush();
    expect(service).toBeTruthy();
    expect(shouldGoHere).toBe(true);
  }));

  it('should remove', fakeAsync(() => {
    service.remove([]).subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 204, statusText: 'No Content' });
    expect(service).toBeTruthy();
  }));

  it('should remove in error', fakeAsync(() => {
    let shouldGoHere = false;
    service
      .remove([])
      .pipe(
        catchError(() => {
          shouldGoHere = true;
          return of(undefined);
        })
      )
      .subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 500, statusText: 'Internal Error' });
    flush();
    expect(service).toBeTruthy();
    expect(shouldGoHere).toBe(true);
  }));
});
