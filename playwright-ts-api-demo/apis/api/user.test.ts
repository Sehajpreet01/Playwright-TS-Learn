
import { test, expect, request } from '@playwright/test';
import { UserService } from '../../apis/userService';

test.describe('User API Tests', () => {
  let userService: UserService;

  test.beforeAll(async ({ playwright }) => {
    const apiRequestContext = await request.newContext({
      baseURL: 'https://gorest.co.in/public/v2', // or pull from config/env
      extraHTTPHeaders: {
      Authorization: 'Bearer 1234567890',
      },
    });
    userService = new UserService(apiRequestContext);
  });

  test('Create and fetch a user', async () => {
    const userPayload = {
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'male',
      status: 'active',
    };

    const createRes = await userService.createUser(userPayload);
    expect(createRes.ok()).toBeTruthy();

    const createdUser = await createRes.json();
    expect(createdUser.name).toBe(userPayload.name);

    const fetchRes = await userService.getUser(createdUser.id);
    expect(fetchRes.status()).toBe(200);
    const fetchedUser = await fetchRes.json();
    expect(fetchedUser.email).toBe(userPayload.email);
  });
});
