import { TestBed } from '@angular/core/testing';

import { ApiAppointmentService } from './api-appointment.service';

describe('ApiAppointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAppointmentService = TestBed.get(ApiAppointmentService);
    expect(service).toBeTruthy();
  });
});
