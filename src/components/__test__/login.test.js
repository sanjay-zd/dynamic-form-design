import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from '../LoginPage';

describe('LoginPage', () => {
  it('renders without errors', () => {
    render(<LoginPage />);
  });

  it('has initial empty username and password', () => {
    const { getByLabelText } = render(<LoginPage />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('updates state on typing in the input fields', () => {
    const { getByLabelText } = render(<LoginPage />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  it('calls handleLogin with the correct credentials on form submission', () => {
    const mockHandleLogin = jest.fn();
    const { getByLabelText, getByText } = render(<LoginPage handleLogin={mockHandleLogin} />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  it('prevents default form submission behavior', () => {
    const mockHandleLogin = jest.fn();
    const { getByTestId } = render(<LoginPage handleLogin={mockHandleLogin} />);
    const form = getByTestId('login-form');

    const onSubmit = jest.fn();
    form.onsubmit = onSubmit;

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalled();
  });
});
