import { TestBed } from '@angular/core/testing';

import { ArtVenteServiceService } from './art-vente-service.service';

describe('ArtVenteServiceService', () => {
  let service: ArtVenteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtVenteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
