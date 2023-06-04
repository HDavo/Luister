import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  public location!: string;

  constructor(
    private renderer: Renderer2,
    route: ActivatedRoute,
    Router: Router
  ) {
    route.params.subscribe((params: any) => {
      if (
        params.section == 'profile' ||
        params.section == 'following' ||
        params.section == 'settings'
      ) {
        this.location = params.section;
      } else {
        Router.navigate(['/not-found']);
      }
    });
  }

  ngAfterViewInit() {}

  enableDisable(element: any) {
    if (element.classList.contains('enabled')) {
      this.renderer.addClass(element, 'disabled');
      this.renderer.removeClass(element, 'enabled');
    } else {
      this.renderer.addClass(element, 'enabled');
      this.renderer.removeClass(element, 'disabled');
    }
  }

  updateUserData(element: any) {
    const target = element.parentNode.getElementsByClassName(
      'userdata-input-field'
    )[0];
    if (target.getAttribute('disabled') != null) {
      target.removeAttribute('disabled');
      element.innerHTML = 'Guardar';
    } else {
      alert('Guardado');
      target.setAttribute('disabled', '');
      element.innerHTML = 'Editar';
    }
    target.focus();
  }
  //Para el toggle
  toggleChange(checked: boolean) {
    if (checked) {
      alert('Has aceptado la personalización');
    } else {
      alert('Has rechazado la personalización');
    }
  }
}
