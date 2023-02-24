import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../shared/services/user/user.service";
import {Router} from "@angular/router";
import * as url from "url";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private router: Router) {
  }

  public searchQuery?: string;

  public getContest() {
    this.router.navigate([`${this.router.url}/${this.searchQuery}`]);
  }



}
