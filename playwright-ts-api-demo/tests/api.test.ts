// Import required modules from Playwright Test
import { test, expect, request } from '@playwright/test';
// Import our API service class that we created
import { ApiService } from '../utils/apiService';

// Create a test suite for our API tests using describe
test.describe('JSON Placeholder API Tests', () => {
  // Declare a variable to hold our API service
  let apiService: ApiService;

  // This runs once before all the tests in this describe block
  test.beforeAll(async ({ playwright }) => {
    // Create a new request context to use for our API calls
    // This sets up the HTTP client with the baseURL from our config
    const apiRequestContext = await request.newContext();
    
    // Create a new instance of our API service with the request context
    apiService = new ApiService(apiRequestContext);
  });

  // Our first test case - Getting all posts
  test('Should fetch all posts', async () => {
    // Call our API service to get all posts
    const response = await apiService.getAllPosts();
    
    // Check that the HTTP status code is 200 (OK)
    expect(response.status()).toBe(200);
    
    // Parse the JSON response body
    const posts = await response.json();
    
    // Verify that the response is an array
    expect(Array.isArray(posts)).toBeTruthy();
    
    // Verify that we have at least one post
    expect(posts.length).toBeGreaterThan(0);
    
    // Check the structure of the first post
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  // Test case for getting a specific post by ID
  test('Should fetch a specific post', async () => {
    // Specify the ID of the post we want to fetch
    const postId = 1;
    
    // Call our API service to get the post with ID 1
    const response = await apiService.getPostById(postId);
    
    // Check that the HTTP status code is 200 (OK)
    expect(response.status()).toBe(200);
    
    // Parse the JSON response body
    const post = await response.json();
    
    // Verify the post has the correct ID
    expect(post.id).toBe(postId);
    
    // Check that the post has the expected properties
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
    
    // Check that the properties are of the expected types
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(typeof post.userId).toBe('number');
  });

  // Test case for creating a new post
  test('Should create a new post', async () => {
    // Create a post object with the data we want to send
    const postData = {
      title: 'My New Post',
      body: 'This is the content of my new post.',
      userId: 1
    };
    
    // Call our API service to create a new post
    const response = await apiService.createPost(postData);
    
    // Check that the HTTP status code is 201 (Created)
    expect(response.status()).toBe(201);
    
    // Parse the JSON response body
    const createdPost = await response.json();
    
    // Check that the created post has an ID (assigned by the server)
    expect(createdPost).toHaveProperty('id');
    
    // Verify that the response contains the data we sent
    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.body).toBe(postData.body);
    expect(createdPost.userId).toBe(postData.userId);
  });

  // Test case for updating a post
  test('Should update an existing post', async () => {
    // Specify the ID of the post we want to update
    const postId = 1;
    
    // Create an object with the updated data
    const updatedData = {
      title: 'Updated Post Title',
      body: 'This is the updated content of the post.',
      userId: 1
    };
    
    // Call our API service to update the post
    const response = await apiService.updatePost(postId, updatedData);
    
    // Check that the HTTP status code is 200 (OK)
    expect(response.status()).toBe(200);
    
    // Parse the JSON response body
    const updatedPost = await response.json();
    
    // Verify that the response contains the updated data
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.body).toBe(updatedData.body);
    expect(updatedPost.id).toBe(postId);
  });

  // Test case for deleting a post
  test('Should delete a post', async () => {
    // Specify the ID of the post we want to delete
    const postId = 1;
    
    // Call our API service to delete the post
    const response = await apiService.deletePost(postId);
    
    // Check that the HTTP status code is 200 (OK) or 204 (No Content)
    // JSONPlaceholder typically returns 200 for DELETE
    expect(response.status()).toBeLessThan(300);
  });
}); 