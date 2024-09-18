import {Component, ElementRef, ViewChild} from '@angular/core';
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
  @ViewChild('1') firstDigit!: ElementRef;
  @ViewChild('2') secondDigit!: ElementRef;
  @ViewChild('3') thirdDigit!: ElementRef;
  @ViewChild('4') fourthDigit!: ElementRef;
  @ViewChild('5') fifthDigit!: ElementRef;
  @ViewChild('6') sixthDigit!: ElementRef;

  allDigitFields = [
    () => this.firstDigit,
    () => this.secondDigit,
    () => this.thirdDigit,
    () => this.fourthDigit,
    () => this.fifthDigit,
    () => this.sixthDigit
  ]
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


  allDigits = [
    () => this.digit1,
    () => this.digit2,
    () => this.digit3,
    () => this.digit4,
    () => this.digit5,
    () => this.digit6
  ];

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

  ngAfterViewInit(): void {
    this.firstDigit.nativeElement.focus();
  }

  moveForward(event: any, divNumber: number): void {
    const target = event.target as HTMLInputElement;
    if (target.value.length === 1) {
      if (divNumber === 7) {
        this.onSubmit();
      } else {
        this.allDigitFields[divNumber - 1]().nativeElement.focus();
      }
    }
  }

  moveBack(divNumber: number): void {
    this.allDigitFields[divNumber - 1]().nativeElement.focus();
  }

  onSubmit(): void {
    console.log('Submit');
  }

  onResendCode(): void {
    console.log('Resend Code');
  }

  isFormComplete(): boolean {
    let isFormFinished = true;
    this.allDigits.forEach(digit => {
      if (digit() === '') {
        isFormFinished = false;
        return;
      }
    })
    return !isFormFinished;
  }
}