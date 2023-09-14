import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (route, state) => {
    const authGuard = TestBed.inject(AuthGuard); // Create an instance of AuthGuard
    return authGuard.canActivate(route, state); // Call the canActivate method on the instance
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard], // Provide AuthGuard in the testing module
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
