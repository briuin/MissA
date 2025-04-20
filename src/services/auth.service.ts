import axios from 'axios';

// API base URL - replace with your actual API URL
const API_BASE_URL = 'http://localhost:8080'; // Adjust to your NestJS server URL

export interface SignUpDto {
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpResponse {
  userSub: string;
}

export interface SignInResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export interface AuthUser {
  email: string;
  sub: string;
  isAuthenticated: boolean;
}

class AuthService {
  async signUp(email: string, password: string): Promise<SignUpResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Sign-up error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<SignInResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  }

  async confirmSignUp(email: string, code: string): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/confirm`, { email, code });
      return response.data;
    } catch (error) {
      console.error('Confirm sign-up error:', error);
      throw error;
    }
  }

  async resendConfirmation(email: string): Promise<{ destination: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/resend`, { email });
      return response.data;
    } catch (error) {
      console.error('Resend confirmation error:', error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<{ destination: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/forgot`, { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<SignInResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
      return response.data;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  }

  storeTokens(tokens: SignInResponse): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('idToken', tokens.idToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('userEmail', this.parseJwt(tokens.idToken).email);
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;
    
    // Basic expiration check
    try {
      const decoded = this.parseJwt(token);
      return decoded.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  }

  getCurrentUser(): AuthUser | null {
    if (!this.isAuthenticated()) return null;
    
    const idToken = localStorage.getItem('idToken');
    if (!idToken) return null;
    
    try {
      const decoded = this.parseJwt(idToken);
      return {
        email: decoded.email,
        sub: decoded.sub,
        isAuthenticated: true
      };
    } catch (e) {
      return null;
    }
  }

  // Helper function to parse JWT
  private parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return {};
    }
  }
}

export const authService = new AuthService();
export default authService;
