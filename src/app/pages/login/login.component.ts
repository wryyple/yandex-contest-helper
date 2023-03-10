import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user/user.service";
import {Globals} from "../../shared/globals/globals";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    let code = this.activatedRoute.snapshot.queryParams["code"];

    if (code) {
      console.log(code);
      this.userService.yandexUserCode = code;
      this.userService.getJWTFromAPI();
    }
  }

  public loginWithYandex() {
    // /authorize?response_type=code&client_id=bbf0d26f16074426bba9724c131784ae
    window.location.href = `/jwt/authorize?response_type=code&client_id=${Globals.Client_ID}`;
  }
}
