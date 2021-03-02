import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent {
  private errorMessageToken: boolean;
  private errorMessageFromIban: string;
  private errorFromAccountIban = false;

  constructor(private readonly formBuilder: FormBuilder) {}

  ibanLength = 24;

  maxIban = '29';

  min = 1;

  max = 24;

  currency = ['RON', 'EUR', 'USD'];

  errorMessage = '';

  // set validators for each control [a-zA-Z0-9_ ] - alphanumeric regex
  paymentForm: FormGroup = new FormGroup({
    fromAccountIban: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_ ]*$/),
      Validators.minLength(this.min),
      Validators.maxLength(this.ibanLength),
    ]),
    toAccountIban: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_ ]*$/),
      Validators.minLength(this.min),
      Validators.maxLength(this.ibanLength),
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.minLength(this.min),
      Validators.maxLength(this.min),
    ]),
    token: new FormControl('', [
      Validators.required,
      Validators.pattern(new RegExp(/^[a-zA-Z0-9]*$/)),
      Validators.minLength(this.min),
      Validators.maxLength(this.max),
    ]),
  });


// check validity of controls if Inalid inputs disable button otherwise enable
  submitted = this.paymentForm.controls.fromAccountIban.status === 'INVALID' &&
    this.paymentForm.controls.toAccountIban.status === 'INVALID' &&
    this.paymentForm.controls.amount.status === 'INVALID' &&
    this.paymentForm.controls.token.status === 'INVALID';

  // validate token input if is alphanumeric else errormessage
  validateTokenInput(field) {
    if (this.paymentForm.controls[field].status === 'VALID') {
      this.paymentForm.patchValue({
        [field]: this.paymentForm.controls[field].value,
      });
      this.errorMessage = '';
      this.errorMessageToken = false;
    } else {
      this.errorMessage = 'Invalid Token';
      this.errorMessageToken = true;
    }
  }

// display iban with spaces between 4 characters in this format 'XXXX XXXX XXXX XXXX' with upperCasses
  getPreviewIban(field) {
    let iban = this.paymentForm.controls[field].value.toUpperCase();

    if (iban.length === this.max) {
      iban = iban
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
    }

    if (this.paymentForm.controls[field].status === 'VALID') {
      this.errorMessageFromIban = '';
      this.errorFromAccountIban = false;
    } else {
      this.errorMessageFromIban = 'Invalid Iban';
      this.errorFromAccountIban = true;
    }

    this.paymentForm.patchValue({
      [field]: iban,
    });
  }
}
