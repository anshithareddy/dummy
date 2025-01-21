import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../components/Login';

describe('Login Component', () => {
  it('renders input fields for email and password', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders Login and Sign Up buttons', () => {
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls the appropriate functions on button clicks', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.click(loginButton);
    expect(consoleLogSpy).toHaveBeenCalledWith('Login with:', { email: '', password: '' });

    fireEvent.click(signUpButton);
    expect(consoleLogSpy).toHaveBeenCalledWith('Sign Up with:', { email: '', password: '' });

    consoleLogSpy.mockRestore();
  });
});
