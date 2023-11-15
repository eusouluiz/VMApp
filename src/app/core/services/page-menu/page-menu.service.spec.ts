import { TestBed } from '@angular/core/testing';

import { PageMenuService } from './page-menu.service';

describe('PageMenuService', () => {
  let service: PageMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageMenuService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
