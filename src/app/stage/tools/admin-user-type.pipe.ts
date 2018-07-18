import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminUserType'
})
export class AdminUserTypePipe implements PipeTransform {

  transform(value: string): string {
    let transformedType: string;

    switch (value) {
      case 'SUPER_ADMIN':
      transformedType = 'Super Admin';
      break;
      case 'ADMIN':
      transformedType = 'Admin';
      break;
      default:
      transformedType = 'Unspecified';
      break;
    }
    return transformedType;
  }

}
