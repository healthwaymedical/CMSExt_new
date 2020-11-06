import { TestBed } from '@angular/core/testing';

import { AppointmentFormService } from './appointment-form.service';

describe('AppointmentFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentFormService = TestBed.get(AppointmentFormService);
    expect(service).toBeTruthy();
  });
});
