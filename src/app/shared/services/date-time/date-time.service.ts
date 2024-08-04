import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getCurrentDateTime(): Date {
    const dateTime: Date = new Date();
    dateTime.setMilliseconds(0);
    return dateTime;
  }

  private findDateComponentFromDateString(date: string): number[] {
    const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    const found = date.match(regex);
    let createdAtYear: number;
    let createdAtMonth: number;
    let createdAtDay: number;
    let createdAtHour: number;
    let createdAtMinute: number;
    let createdAtSecond: number;
    if(found) {
      createdAtYear = parseInt(found[1]);
      createdAtMonth = parseInt(found[2]);
      createdAtDay = parseInt(found[3]);
      createdAtHour = parseInt(found[4]);
      createdAtMinute = parseInt(found[5]);
      createdAtSecond = parseInt(found[6]);
      return [createdAtYear, createdAtMonth, createdAtDay, createdAtHour, createdAtMinute, createdAtSecond];
    }
    return [];
  }

  getTimeByCompareCreatedAtAndCurrentDate(created_at: string): string {
    const currentDateStr: string = this.getCurrentDateTime().toISOString();
    // console.log("current date: "+currentDateStr);
    // console.log("created_at: "+created_at);
    const currentDate: number[] = this.findDateComponentFromDateString(currentDateStr);
    const createdAtDate: number[] = this.findDateComponentFromDateString(created_at);
    // console.log(currentDate)
    // console.log(createdAtDate)
    let shownDate: string = "";
    if (currentDate.length != 0 && createdAtDate.length != 0) {
      if (currentDate[0] - createdAtDate[0] >= 1) {
        shownDate = currentDate[0] - createdAtDate[0] + " year ago";
        return shownDate;
      }
      if (currentDate[1] - createdAtDate[1] >= 1) {
        shownDate = currentDate[1] - createdAtDate[1] + " month ago";
        return shownDate;
      }
      if (currentDate[2] - createdAtDate[2] >= 1) {
        shownDate = currentDate[2] - createdAtDate[2] + " day ago";
        return shownDate;
      }
      if (currentDate[3] - createdAtDate[3] >= 1) {
        shownDate = currentDate[3] - createdAtDate[3] + " hour ago";
        return shownDate;
      }
      if (currentDate[4] - createdAtDate[4] >= 1) {
        shownDate = currentDate[4] - createdAtDate[4] + " minute ago";
        return shownDate;
      }
      shownDate = "1 minute ago"
    }
    return shownDate;
  }

  getStringRepresentDateTime(created_at: string): string {
    const date = new Date(created_at);
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()];

    return `${month}, ${day}, ${year}`;
  }
}
