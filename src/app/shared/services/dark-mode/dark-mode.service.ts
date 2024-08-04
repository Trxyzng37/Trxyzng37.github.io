import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  constructor(
    private storageService: StorageService
  ) { }

  //0 light, 1 dark
  useDarkMode() {
    const mode = this.storageService.getItem("mode") == "1" ? 1 : 0;
    if(mode == 1) {
      document.body.style.setProperty("--primary_background_color", "#222831");
      document.body.style.setProperty("--neutral", "#31363F");
      document.body.style.setProperty("--secondary_color", "#ffffff");
      document.body.style.setProperty("--link", "#648EFC");
      let el = document.querySelectorAll<HTMLElement>('*');
      for(var i=0;i<el.length;i++){
        el[i].style.color = '#ffffff';
      }
    }
    else {
      document.body.style.setProperty("--primary_background_color", "#ffffff");
      document.body.style.setProperty("--neutral", "#efefef");
      document.body.style.setProperty("--secondary_color", "#000000");
      document.body.style.setProperty("--link", "#01255c");
      let el = document.querySelectorAll<HTMLElement>('*');
      for(var i=0;i<el.length;i++){
        el[i].style.color = '#000000';
      }
    }
  }
}
