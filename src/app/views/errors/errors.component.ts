import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'errors',
  template: `
    <small>
      <ul class="p-0 m-0" *ngIf="showErrors()">
        <li
          style="color: red; list-style-type: none;"
          *ngFor="let error of errors()"
        >
          {{ error }}
        </li>
      </ul>
    </small>
  `,
})
export class ErrorsComponent {
  private static readonly errorMessages = {
    required: () => 'This field is required',
    min: params => 'The min value is ' + params.min,
    max: params => 'The max value is ' + params.max,
    minlength: params =>
      'The min number of characters is ' + params.requiredLength,
    maxlength: params =>
      'The max allowed number of characters is ' + params.requiredLength,
    pattern: params => 'The required pattern is: ' + params.requiredPattern,
    age: params => params.message,
    vaildEmail: params => params.message,
    validNumber: params => params.message,
    validatePhoneNumber: () => 'Number is invalid.',
    email: () => 'Email address is invalid.',
    userid: () => 'User ID already exists.',
    userIdIsValid: () => 'User ID is valid.',
    userIdIsNotValid: () => 'Identification is not valid.',
    zipcode: () => 'The zipcode does not exist.',
    useridNotExist: () => 'Something happened while parsing for the ID.',
    policyExpired: () => 'End date must not be before today.',
    mcEndDateAfterPolicy: () =>
      'End date must not be beyond medical coverage end date.',
    invalidStartDate: () => 'Start date must be before end date.',
    invalidEndDate: () => 'End date must be after start date.',
    planAlreadyExist: () => 'Duplicate plan found. Please delete accordingly.',
    planIsInactive: () =>
      'This plan is inactive. Please delete accordingly or contact administrator.',
    invalidDiscount: params => params.message,
    samePassword: params => params.message,
    bsDate: params => params.invalid,
    multiplierError: params =>
      'Value must be the multiplier of ' + params.multiplier,
      serialHiNotValid: () => 'Only 8 characters. Last two characters need to either be. "61" or "11"',
      appointmentTimeNotValid: () => 'Appointment time is not valid.',
    appointmentBookingPeriodNotValid: () =>
      'The booking period for an appointment must be 1 hour in advance of the appointment time.',
    reminderDateTimeNotValid: () =>
      'Reminder time must be 1 hour in advance of the appointment time.',
    reminderDateTimeBeforeToday: () =>
      'Reminder time must be after current time.',
    durationTimeNotValid: () => 'Duration must be at least 15 minutes.',
    mandatorySelectionError: () => 'This selection is required',
    uniqueBatch: () => 'Batch number must be unique in same item',
    grnItemQtyExceedMax: () =>
      'Receiving Quantity cannot be more than Order Quantity',
    doItemQtyExceedMax: () => 'Quantity cannot be more than Order Quantity',
    intValidator: () => 'Input must be integer.',
    recevedAmtGreaterThanTotal: () => 'Total received amount should not be greater than Total payment amount.',
    exceededRequestedQuantity: () => 'Quantity has exceeded the requested quantity',
    exceededStockQuantity: () => 'Quantity has exceeded the stock available quantity',
    proInvalidItem: () => 'Item does not exist in the clinic'
  };

  @Input() private control: AbstractControlDirective | AbstractControl;

  showErrors(): boolean {
    return (
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  errors(): string[] {
    return Object.keys(this.control.errors).map(field =>
      this.getMessage(field, this.control.errors[field])
    );
  }

  private getMessage(type: string, params: any) {
    return ErrorsComponent.errorMessages[type](params);
  }
}
