import { Directive } from '@angular/core';

@Directive({
  selector: '[appLowerCase]',
  host: {
		'(change)': 'onChange($event)',
		'[value]': 'value'
  }
})
export class LowerCaseDirective {
  value: string = "";
  onChange($event: any) {
		this.value = $event.target.value.toLowerCase();
  }
}
