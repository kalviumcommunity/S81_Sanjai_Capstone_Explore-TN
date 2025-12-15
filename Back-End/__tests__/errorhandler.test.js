const ErrorHandler = require('../utils/errorhandler');

describe('ErrorHandler Utility Tests', () => {

    // Test 1: ErrorHandler should create an instance with correct message
    test('should create ErrorHandler instance with correct message', () => {
        const errorMessage = 'Test error message';
        const statusCode = 400;

        const error = new ErrorHandler(errorMessage, statusCode);

        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(statusCode);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ErrorHandler);
    });

    // Test 2: ErrorHandler should set correct status code
    test('should set correct HTTP status code', () => {
        const error404 = new ErrorHandler('Not Found', 404);
        const error500 = new ErrorHandler('Internal Server Error', 500);
        const error401 = new ErrorHandler('Unauthorized', 401);

        expect(error404.statusCode).toBe(404);
        expect(error500.statusCode).toBe(500);
        expect(error401.statusCode).toBe(401);
    });

    // Test 3: ErrorHandler should have stack trace
    test('should capture stack trace', () => {
        const error = new ErrorHandler('Stack trace test', 500);

        expect(error.stack).toBeDefined();
        expect(typeof error.stack).toBe('string');
        expect(error.stack.length).toBeGreaterThan(0);
    });

    // Test 4: ErrorHandler should extend Error class
    test('should extend Error class properly', () => {
        const error = new ErrorHandler('Inheritance test', 400);

        expect(error instanceof Error).toBe(true);
        expect(error instanceof ErrorHandler).toBe(true);
        expect(error.constructor.name).toBe('ErrorHandler');
    });

    // Test 5: ErrorHandler should handle different error scenarios
    test('should handle various error scenarios', () => {
        const validationError = new ErrorHandler('Validation failed', 422);
        const authError = new ErrorHandler('Authentication required', 401);
        const forbiddenError = new ErrorHandler('Access forbidden', 403);

        expect(validationError.message).toBe('Validation failed');
        expect(validationError.statusCode).toBe(422);

        expect(authError.message).toBe('Authentication required');
        expect(authError.statusCode).toBe(401);

        expect(forbiddenError.message).toBe('Access forbidden');
        expect(forbiddenError.statusCode).toBe(403);
    });
});
