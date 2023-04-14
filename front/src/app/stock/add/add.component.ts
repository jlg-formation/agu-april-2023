import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  catchError,
  delay,
  finalize,
  map,
  of,
  pairwise,
  reduce,
  scan,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  errorMsg = '';
  f = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    qty: new FormControl('0', [Validators.required, Validators.min(0)]),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isSubmitting = false;

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.f.controls.qty.valueChanges
      .pipe(
        scan((acc, value) => {
          if (value === null) {
            acc = null;
            return acc;
          }
          if (value.match(/^\d*$/)) {
            acc = value;
            return acc;
          }
          return acc;
        }, '0' as string | null)
      )
      .subscribe((value) => {
        this.f.controls.qty.setValue(value, { emitEvent: false });
      });
  }

  submit() {
    of(void 0)
      .pipe(
        tap(() => {
          this.isSubmitting = true;
          this.errorMsg = '';
        }),
        delay(2000),
        switchMap(() => {
          const newArticle: NewArticle = {
            name: this.f.value.name as string,
            price: this.f.value.price as number,
            qty: Number(this.f.value.qty),
          };
          return this.articleService.add(newArticle);
        }),
        switchMap(() => {
          return this.articleService.refresh();
        }),
        switchMap(() => {
          return this.router.navigate(['..'], { relativeTo: this.route });
        }),
        catchError((err) => {
          this.errorMsg = 'Oups... Erreur technique.';
          return of(undefined);
        }),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe();
  }
}
