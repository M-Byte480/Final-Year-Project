import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../shared/button/button.component";

@Component({
  selector: 'app-security-code-page',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ButtonComponent
  ],
  templateUrl: './security-code-page.component.html',
  styleUrl: './security-code-page.component.css'
})
export class SecurityCodePageComponent {
  enteredEmail: string = 'a@example.com';

  countDownToResendCode: number = 25;
  countDownRef = setInterval(() => {
    this.countDownToResendCode--;
    if (this.countDownToResendCode === 0) {
      clearInterval(this.countDownRef);
    }
  }, 1_000);

  digit1: string = '';
  digit2: string = '';
  digit3: string = '';
  digit4: string = '';
  digit5: string = '';
  digit6: string = '';

  ngOnInit(): void {
    const indexOfAt = this.enteredEmail.indexOf('@');
    let nameSubstring = 2;
    let domainSubstring = 1;
    if (indexOfAt < 3) {
      nameSubstring = 1;
      domainSubstring = 0;
    }

    this.enteredEmail = this.enteredEmail.substring(0, nameSubstring) + '***' + this.enteredEmail.substring(indexOfAt - domainSubstring);

  }

  moveForward(event: any, divNumber: number): void {

  }

  moveBack(divNumber: number): void {

  }

  onSubmit(): void {

  }

  onResendCode(): void {

  }
}
