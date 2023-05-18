import { Component, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {

  private token!:string;
  public setPasswordForm: FormGroup = this.formBuilder.group({
    password: ['',[Validators.required]],
    passwordrepeat: ['',[Validators.required]]
  })

  constructor(
    route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private renderer: Renderer2
  ){
    route.params
    .subscribe((res:any)=>{
      this.token = res.token;
    })
  }
  updatePassword(){
    alert('Request sent! '+this.token);
  }
  showHidePassword(event:any){
    const clicked = event.target,
          target = event.target.parentNode.getElementsByTagName('input')[0],
          type = target.getAttribute('type');
    if(type == 'password'){
      this.renderer.removeClass(clicked,'show-hide-pass');
      this.renderer.addClass(clicked,'show-hide-pass2');
      this.renderer.setProperty(target,'type','text');
    }else {
      this.renderer.removeClass(clicked,'show-hide-pass2');
      this.renderer.addClass(clicked,'show-hide-pass');
      this.renderer.setProperty(target,'type','password');
    }
  }
}
