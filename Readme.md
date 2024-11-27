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

### `registerUserHandler(userData, req, res)`
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

### User Schema
Zod validation schema for user registration with the following checks:
- Full name validation
- Email format validation
- Password length requirements

## POST user/login

Authenticates a user and generates an authentication token.

### Request Body
- `email` (string): User's email address
- `password` (string): User's password

### Success Response

- Status Code: 200
- Content:
    - `token`: Authentication token (string)
    - `user`: User data (object)

### Error Responses
- 400: Please send valid data or Invalid username or password
- 500: Error registering captain

### API Documentation

#### POST captain/register
Register a new captain

**Access**: Public

**Parameters**:
- `req`: Express request object
    - `req.body`: Captain registration data
- `res`: Express response object

**Responses**:
- 200: Successfully registered the user with token and captain data
- 400: Error, Please Provide Valid Credentials
- 500: Error registering captain

#### POST captain/login
Login a captain

**Access**: Public

**Parameters**:
- `req`: Express request object
    - `req.body`: Captain login data
- `res`: Express response object

**Responses**:
- 200: Successfully logged in the user with token and captain data
- 400: Please send valid data or Invalid username or password