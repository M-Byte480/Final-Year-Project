import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {RouterDataTransferService} from "../../../services/registration-service/router-data-transfer-service.service";
import {HttpApiService} from "../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../services/http/endpoints";

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
  enteredEmail: string = '';
  displayedEmail: string = 'No Email found';
  dataFromRegistration: any;

  awaitMessage = 'Waiting to send email';
  countDownToResendCode: number | null = null;
  countDownRef: any;

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

  constructor(private router: Router,
              private routerDataTransfer: RouterDataTransferService,
              private httpService: HttpApiService) {
    this.dataFromRegistration = this.routerDataTransfer.getState();
  }


  ngOnInit(): void {
    if (this.dataFromRegistration['apiResponse']) {
      this.enteredEmail = this.dataFromRegistration['apiResponse'].message;
      this.displayedEmail = this.enteredEmail;
      this.hideEmail();
      this.sendVerificationEmail(this.enteredEmail);
    }
  }

  ngAfterViewInit(): void {
    this.firstDigit.nativeElement.focus();
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasteData = event.clipboardData?.getData("text");
    if (!pasteData) {
      return;
    }
    if (pasteData.length !== 6) {
      return;
    }

    for (let i = 0; i < 6; i++) {
      const digit = pasteData[i].toString();
      const classDigitField = 'digit' + (i + 1) as keyof this;
      // @ts-ignore
      this[classDigitField] = digit;
    }

    this.onSubmit();
  }

  private startCountdown() {
    this.countDownToResendCode = 60;
    this.countDownRef = setInterval(() => {
      if (this.countDownToResendCode && this.countDownToResendCode > 0) {
        this.countDownToResendCode--;
      }

      if (this.countDownToResendCode === 0) {
        clearInterval(this.countDownRef);
      }
    }, 1_000);
  }

  sendVerificationEmail(email: string) {
    const emailPayload = {
      email: email
    };
    this.httpService.postNoAuth(ENDPOINTS['sendVerificationEmail'], emailPayload).subscribe({
      next: () => {
        this.startCountdown();
      },
      error: () => {
        console.error('Error sending verification email');
      }
    });
  }

  hideEmail() {
    const indexOfAt = this.displayedEmail.indexOf('@');

    let nameSubstring = 2;
    let domainSubstring = 1;

    if (indexOfAt < 3) {
      nameSubstring = 1;
      domainSubstring = 0;
    }

    this.displayedEmail = this.displayedEmail.substring(0, nameSubstring) + '***' + this.displayedEmail.substring(indexOfAt - domainSubstring);
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
    const verificationCode = this.allDigits.map(digit => digit()).join('');
    this.httpService.postNoAuth(ENDPOINTS['submitRegistrationVerificationCode'], {
      email: this.enteredEmail,
      code: verificationCode
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']).then(r => console.log('Navigated to login'));
      },
      error: () => {
        console.error('Error submitting verification code');
      }
    });
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
