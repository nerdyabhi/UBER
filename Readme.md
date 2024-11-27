# User Registration Module

## Overview
Module for handling user registration and validation functionality.

## Types and Interfaces

### UserRegistrationInput
Object containing user registration data:
- **fullName**: Object containing user's name
    - `firstName`: User's first name (string)
    - `lastName`: User's last name (string)
- **email**: User's email address (string)
- **password**: User's password, minimum 6 characters (string)

## Core Functions

### `registerUser(userData, req, res)`
Handles the user registration process.

**Parameters:**
- `userData`: UserRegistrationInput object
- `req`: Express request object
- `res`: Express response object

**Returns:**
- Promise resolving to JSON object with token and user data

**Errors:**
- 400: Email already exists
- 403: Other registration errors

## Validation

### User Schema
Zod validation schema for user registration with the following checks:
- Full name validation
- Email format validation
- Password length requirements