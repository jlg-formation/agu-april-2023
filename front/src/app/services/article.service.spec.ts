import { TestBed, fakeAsync } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { newArticle } from 'src/test/article.data';
import { catchError, of } from 'rxjs';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new article', () => {
    service.add(newArticle).subscribe();
    expect(service).toBeTruthy();
  });

  it('should add a new article in error', fakeAsync(() => {
    let shouldGoHere = false;
    service
      .add({ ...newArticle, name: 'xxx' })
      .pipe(
        catchError(() => {
          shouldGoHere = true;
          return of(undefined);
        })
      )
      .subscribe();
    expect(service).toBeTruthy();
    expect(shouldGoHere).toBe(true);
  }));
});
