import { TestBed } from '@angular/core/testing';

import { AppointmentFactoryService } from './appointment-factory.service';

describe('AppointmentFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentFactoryService = TestBed.get(AppointmentFactoryService);
    expect(service).toBeTruthy();
  });
});
