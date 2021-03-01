import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { LionFieldset } from '@lion/fieldset';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder) {}

  submitted = false;

  ibanLength = 24;

  maxIban = '29';

  min = 1;

  max = 24;

  currency = ['RON', 'EUR', 'USD'];

  paymentForm: FormGroup = new FormGroup({
    fromAccountIban: new FormControl('', [Validators.required]),
    toAccountIban: new FormControl('', [
      Validators.required,
      Validators.minLength(this.ibanLength),
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
      Validators.pattern(/^[a-zA-Z0-9.]*$/),
      Validators.minLength(this.min),
      Validators.maxLength(this.max),
    ]),
  });

  ngOnInit() {
    console.log();
  }

  validateInput(field) {
    this.paymentForm.patchValue({
      [field]: this.paymentForm.controls[field].value,
    });
  }
  getPreviewIbaen(iban) {
    const digit = iban.replace(/\D+/g, '');

    const shortIban = digit.length > 4 ? digit : `0000${digit}`;

    const last = shortIban.length;

    const first = last - 5;

    return shortIban.substring(first, last);
  }

  getPreviewIban(field) {
    let iban = this.paymentForm.controls[field].value.toUpperCase();

    if (iban.length === this.max) {
      iban = iban
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      console.log(iban.length);
      console.log(iban);
    }
    console.log(iban.length);

    this.paymentForm.patchValue({
      [field]: iban,
    });
  }
}
