import { APIRequestContext } from '@playwright/test';

/**
 * A service class to interact with the JSON Placeholder API
 * This is a common pattern for organizing API calls in tests
 */
export class ApiService {
  // Store the API request context that Playwright provides
  private request: APIRequestContext;

  /**
   * Constructor that takes a Playwright request context
   * @param request - The Playwright API request context
   */
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Get all posts from the API
   * @returns A Promise that resolves to the API response
   */
  async getAllPosts() {
    // Make a GET request to the /posts endpoint
    return this.request.get('/posts');
  }

  /**
   * Get a specific post by its ID
   * @param id - The ID of the post to retrieve
   * @returns A Promise that resolves to the API response
   */
  async getPostById(id: number) {
    // Make a GET request to the /posts/{id} endpoint
    return this.request.get(`/posts/${id}`);
  }

  /**
   * Create a new post
   * @param data - The post data to create
   * @returns A Promise that resolves to the API response
   */
  async createPost(data: object) {
    // Make a POST request to the /posts endpoint with the provided data
    return this.request.post('/posts', { 
      data: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  /**
   * Update an existing post
   * @param id - The ID of the post to update
   * @param data - The updated post data
   * @returns A Promise that resolves to the API response
   */
  async updatePost(id: number, data: object) {
    // Make a PUT request to the /posts/{id} endpoint with the provided data
    return this.request.put(`/posts/${id}`, { 
      data: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  /**
   * Delete a post
   * @param id - The ID of the post to delete
   * @returns A Promise that resolves to the API response
   */
  async deletePost(id: number) {
    // Make a DELETE request to the /posts/{id} endpoint
    return this.request.delete(`/posts/${id}`);
  }
} 