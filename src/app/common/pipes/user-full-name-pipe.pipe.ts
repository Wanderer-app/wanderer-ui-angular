import { Pipe, PipeTransform } from '@angular/core';
import { UserData } from '../data/user-full-data';

@Pipe({
  name: 'fullname'
})
export class UserFullNamePipePipe implements PipeTransform {

  transform(value: UserData): string {
    return value.firstName + " " + value.lastName;
  }

}
