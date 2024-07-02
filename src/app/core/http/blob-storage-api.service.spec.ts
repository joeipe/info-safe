import { TestBed } from '@angular/core/testing';

import { BlobStorageApiService } from './blob-storage-api.service';

describe('BlobStorageApiService', () => {
  let service: BlobStorageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlobStorageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
