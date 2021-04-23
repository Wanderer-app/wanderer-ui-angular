import { Pipe, PipeTransform } from '@angular/core';
import { UserShortData } from '../data/user-short-data';

@Pipe({
  name: 'fullname'
})
export class UserFullNamePipePipe implements PipeTransform {

  transform(value: UserShortData): string {
    return value.firstName + " " + value.lastName;
  }

}
