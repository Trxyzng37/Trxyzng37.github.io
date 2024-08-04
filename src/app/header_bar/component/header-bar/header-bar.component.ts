import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Communities } from '../../service/pojo/communities';
import { SearchCommunitiesService } from '../../service/search-communites/search-communities.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfile } from '../../service/pojo/user-profile';
import { SearchUserProfileService } from '../../service/search-user-profile/search-user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
  // ,host: {
  //   '(document:click)': 'closeProfileMenu($event)',
  // }
})
export class HeaderBarComponent {
  public constructor(
    private storageService: StorageService,
    private searchCommunitiesService: SearchCommunitiesService,
    private searchUserProfileService: SearchUserProfileService,
    private element: ElementRef,
    private router: Router
  ) {}

  public isSignIn: boolean = false;
  public isProfileMenuOpen: boolean = false;
  public communities_result: Communities[] = [];
  public user_profile_result: UserProfile[] = [];

  ngOnInit() {
    this.isSignIn = this.storageService.getItem("isSignIn") === "true" ? true:false;
    console.log(this.storageService.getItem("isSignIn"))
    this.storageService.setItem("isSignIn", "true");
  }

  onClick() {
    this.isSignIn = !this.isSignIn;
    console.log(this.storageService.getItem("isSignIn"))
  }

  onChange(value: string) {
    if (value !== " " && value !== "") {
      this.searchCommunitiesService.searchCommunities(value).subscribe({
        next: (response: Communities[]) => {
          console.log(response)
          this.communities_result = response;
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
      this.searchUserProfileService.searchUserProfile(value).subscribe({
        next: (response: UserProfile[]) => {
          console.log(response)
          this.user_profile_result = response;
        },
        error: (e: HttpErrorResponse) => {
          console.log("HttpServletResponse: " + e.error.message + "\n" + "ResponseEntity: " + e.error);
        }
      })
    }
    else {
      this.communities_result = [];
      this.user_profile_result = [];
    }
  }

  openProfileMenu(event: Event) {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    console.log("profile meneu open")
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeProfileMenu(event: Event) {
      this.isProfileMenuOpen = false;
      console.log("profile meneu close")
  }

  logOut() {
    this.router.navigate(["/signin"])
    this.storageService.setItem("isSignIn", "false");
  }
}
