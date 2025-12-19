# User Profile Management - Implementation Summary

## Overview
Added PUT and DELETE routes for user profile management and integrated them with the frontend Topbar component to allow users to edit their name and delete their account.

## Backend Changes

### File: `Back-End/Controllers/userroute.js`

#### 1. PUT Route - Update User Profile
- **Endpoint**: `PUT /User/profile`
- **Authentication**: Required (uses `isAuthenticatedUser` middleware)
- **Functionality**: Allows authenticated users to update their profile name
- **Request Body**: `{ name: string }`
- **Response**: Returns updated user object with success message

#### 2. DELETE Route - Delete User Account
- **Endpoint**: `DELETE /User/profile`
- **Authentication**: Required (uses `isAuthenticatedUser` middleware)
- **Functionality**: Allows authenticated users to delete their own account
- **Response**: Returns success message

**Note**: User routes are mounted at `/User` in `app.js` (line 23), so the full endpoint path is `/User/profile`.


## Frontend Changes

### File: `Front-End/src/userService.js` (NEW)
Created a dedicated service module for user-related API calls:
- `getUserProfile()` - Fetches user profile data
- `updateUserProfile(name)` - Updates user's name
- `deleteUserAccount()` - Deletes user's account

All functions automatically include the JWT token from localStorage in the Authorization header.

### File: `Front-End/componants/Topbar.jsx`
Enhanced the profile dropdown with the following features:

#### 1. Name Editing
- Click the edit icon (✏️) next to the name to enter edit mode
- Input field appears with save (✓) and cancel (✗) buttons
- Validation: Name cannot be empty
- On successful update:
  - Updates localStorage with new user data
  - Updates UI immediately
  - Shows success toast notification

#### 2. Account Deletion
- "Delete Account" button in the profile dropdown
- Two-step confirmation process:
  - First click shows confirmation dialog
  - Second click (Yes, Delete) performs the deletion
- On successful deletion:
  - Clears all user data from localStorage
  - Redirects to home page
  - Shows success toast notification

#### 3. Enhanced UI/UX
- Loading states for all async operations
- Disabled buttons during API calls
- Toast notifications for all actions (success/error)
- Clean, organized layout with proper spacing
- Icons for better visual feedback

### File: `Front-End/src/App.jsx`
- Added `react-toastify` imports
- Added `ToastContainer` component with dark theme configuration
- Toast notifications appear in top-right corner with 3-second auto-close

### Dependencies Added
- `react-toastify` - For toast notifications

## User Flow

### Editing Name:
1. User clicks on their profile in the Topbar
2. Dropdown opens showing name and email
3. User clicks the edit icon next to their name
4. Input field appears with current name
5. User edits the name and clicks save
6. API call updates the backend
7. Success toast appears
8. UI updates with new name
9. localStorage is updated

### Deleting Account:
1. User clicks on their profile in the Topbar
2. Dropdown opens
3. User clicks "Delete Account" button
4. Confirmation dialog appears
5. User clicks "Yes, Delete"
6. API call deletes the account
7. Success toast appears
8. User is logged out and redirected to home page

## API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/User/profile` | ✅ | Get current user profile |
| PUT | `/User/profile` | ✅ | Update user name |
| DELETE | `/User/profile` | ✅ | Delete user account |

**Note**: All user routes are mounted at `/User` in the backend (`app.js`).


## Security Features
- All routes protected with JWT authentication
- User can only update/delete their own account
- Input validation on both frontend and backend
- Confirmation required before account deletion

## Testing Recommendations
1. Test name update with valid input
2. Test name update with empty input (should show error)
3. Test account deletion with confirmation
4. Test account deletion cancellation
5. Verify localStorage updates after name change
6. Verify localStorage clears after account deletion
7. Test unauthorized access (without token)
