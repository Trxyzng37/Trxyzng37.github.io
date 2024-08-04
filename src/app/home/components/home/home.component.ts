import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AccessTokenService } from '../../../shared/services/access-token/access-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  private access_token: string;
  public recent_status: string = 'down';
  public favorite_status: string = 'down';

  constructor( 
    private accessTokenService: AccessTokenService, 
    private http: HttpClient,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.access_token = "";
  }

  change_recent_status() {
    this.recent_status = this.recent_status === 'up' ? 'down':'up';
    console.log(this.recent_status)
  }

  change_favorite_status() {
    this.favorite_status = this.favorite_status === 'up' ? 'down':'up';
    console.log(this.favorite_status)
  }

  ngOnInit(): void {
    // this.accessTokenService.get_access_token_from_server().subscribe({
    //   next: (response) => {
    //     this.accessTokenService.set_access_token(response);
    //     this.access_token = this.accessTokenService.get_access_token();
    //     alert("Get access_token from server: " + this.access_token);
    //   },
    //   error: (err) => {
    //     console.log("Access token error:")
    //     console.log(err)
    //     alert("No access token")
    //   }
    // })
  }

  // send() {
  //   let header: HttpHeaders = this.accessTokenService.set_access_token_header();
  //   this.http.get("http://127.0.0.1:8080/check-access-token", {headers: header, observe: 'body', responseType: "text", withCredentials: true}).subscribe({
  //     next: (response) => {
  //       alert(response);
  //     },
  //     error: (e) => {
  //       alert("Error\n"+e);
  //     }
  //   })
  // }
}
