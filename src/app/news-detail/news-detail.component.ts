import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import {  ChildActivationEnd, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article,TopHeadlinesResponse } from 'angular-news-api';

import { NewsService } from '../news.service';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    public article$: Observable<Article>;

    public comments: any[] = [
        {
            name: 'Chris Nat',
            date: new Date(),
            avatar: '/assets/images/1.jpg',
            comment: `Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        },
        {
            name: 'Matt Damon',
            date: new Date(),
            avatar: '/assets/images/2.jpg',
            comment: `Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. `,
        },
        {
            name: 'Seb Willhelm',
            date: new Date(),
            avatar: '/assets/images/3.jpg',
            comment: `Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.`,
        },
    ];

    constructor(
        public activatedRoute: ActivatedRoute,
        private router: Router 
    ) {
    }

    public ngOnInit() {
        
        this.article$ = this.activatedRoute.paramMap.pipe(
            map(() => {
                if (window.history.length > 1 && window.history.state['navigationId'] > 1) {
                    return window.history.state;
                }
                    this.router.navigate(['/news']);
                }
            )
        );

        // Make sure that this page can only be
        // accessible from the main News list with
        // a loaded article from 'state', if url entered
        // manually from the browser it should go back to
        // the /news view

    }

    public goToArticle(url: string): void {
        // Open original article in new tab
        window.open(url, "_blank");
    }
}
