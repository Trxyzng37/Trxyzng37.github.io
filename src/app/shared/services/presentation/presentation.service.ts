import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  constructor() { }

  public transformNumber(input: number): string {
    if (input >= 1000000) {
      const result = input / 1000000;
      // Round to 1 decimal place
      const roundedResult = Math.round(result * 10) / 10;
      // Format the result, removing the .0 if present
      return `${roundedResult.toFixed(1).replace('.0', '')}M`;
    }
    if (input >= 10000) {
      const result = input / 1000;
      // Round to 1 decimal place
      const roundedResult = Math.round(result * 10) / 10;
      // Format the result, removing the .0 if present
      return `${roundedResult.toFixed(0)}K`;
    }
    if (input >= 1000) {
      const result = input / 1000;
      // Round to 1 decimal place
      const roundedResult = Math.round(result * 10) / 10;
      // Format the result, removing the .0 if present
      return `${roundedResult.toFixed(1).replace('.0', '')}K`;
    }
    return input.toString();
  }

  public formatKarma(n: number): string {
    if(n == 0)
      return "0";
    const num = n.toString();
    const parts = [];
    for (let i = 0; i < num.length; i += 3) {
      parts.unshift(num.slice(i, i + 3).replace(/^0+/, ''));
    }
    return parts.join(',');
  }
}
