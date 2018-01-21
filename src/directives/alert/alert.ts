import { Directive } from '@angular/core';

/**
 * Generated class for the AlertDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[alert]' // Attribute selector
})
export class AlertDirective {

  constructor() {
    console.log('Hello AlertDirective Directive');
  }

}
