import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class VoteImgService {

  constructor(
    private storageService: StorageService
  ) { }

  public upvote: string = "";
  public downvote: string = "";

  selectUpVoteImg(): void {
    const mode = this.storageService.getItem("mode") == "0" ? 0 : 1;
    if(mode == 0) {
      this.upvote = "../../../../assets/icon/upvote-dark.svg";
    }
    else {
      this.upvote = "../../../../assets/icon/upvote-light.svg";
    }
  }

  selectDownVoteImg(): void {
    const mode = this.storageService.getItem("mode") == "0" ? 0 : 1;
    if(mode == 0) {
      this.downvote = "../../../../assets/icon/downvote-dark.svg";
    }
    else {
      this.downvote = "../../../../assets/icon/downvote-light.svg";
    }
  }
}
