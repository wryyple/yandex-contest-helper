import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {YandexContestResponse} from "../../shared/interfaces/YandexContestResponse";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  public isError: boolean = false;
  public contestTable?: YandexContestResponse;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getContestObservable().subscribe(val => {
      this.contestTable = (val as YandexContestResponse);
    }, () => {
      this.isError = true;
    });
  }

  ngOnDestroy() {
    // this.getContestObservable();
  }

  private getContestObservable() {
    let id = this.activatedRoute.snapshot.params['id'];
    return this.httpClient.get(`/api/contests/${id}/standings`);
  }

}
