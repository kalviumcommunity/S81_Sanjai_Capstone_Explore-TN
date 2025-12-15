const catchAsyncError = require('../middelware/catchAsyncError');

describe('CatchAsyncError Middleware Tests', () => {

    // Test 1: Should call next with error when async function throws
    test('should catch async errors and pass to next', async () => {
        const mockReq = {};
        const mockRes = {};
        const mockNext = jest.fn();
        const testError = new Error('Test async error');

        const asyncFunction = async () => {
            throw testError;
        };

        const wrappedFunction = catchAsyncError(asyncFunction);
        await wrappedFunction(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(testError);
    });

    // Test 2: Should not call next when async function succeeds
    test('should not call next when no error occurs', async () => {
        const mockReq = {};
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockNext = jest.fn();

        const asyncFunction = async (req, res) => {
            res.status(200).json({ success: true });
        };

        const wrappedFunction = catchAsyncError(asyncFunction);
        await wrappedFunction(mockReq, mockRes, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    // Test 3: Should handle rejected promises
    test('should handle rejected promises', (done) => {
        const mockReq = {};
        const mockRes = {};
        const mockNext = (error) => {
            expect(error.message).toBe('Promise rejected');
            done();
        };
        const rejectionError = new Error('Promise rejected');

        const asyncFunction = async () => {
            return Promise.reject(rejectionError);
        };

        const wrappedFunction = catchAsyncError(asyncFunction);
        wrappedFunction(mockReq, mockRes, mockNext);
    });

    // Test 4: Should pass through function arguments correctly
    test('should pass req, res, next to wrapped function', async () => {
        const mockReq = { body: { test: 'data' } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockNext = jest.fn();

        const asyncFunction = async (req, res, next) => {
            expect(req).toBe(mockReq);
            expect(res).toBe(mockRes);
            expect(next).toBe(mockNext);
            res.status(200).json({ received: req.body });
        };

        const wrappedFunction = catchAsyncError(asyncFunction);
        await wrappedFunction(mockReq, mockRes, mockNext);

        expect(mockRes.json).toHaveBeenCalledWith({ received: { test: 'data' } });
    });

    // Test 5: Should handle multiple error types
    test('should handle different error types', async () => {
        const mockReq = {};
        const mockRes = {};
        const mockNext = jest.fn();

        // Test with TypeError
        const typeErrorFunc = catchAsyncError(async () => {
            throw new TypeError('Type error occurred');
        });
        await typeErrorFunc(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalledWith(expect.any(TypeError));

        // Reset mock
        mockNext.mockClear();

        // Test with custom error
        const customError = { message: 'Custom error', statusCode: 400 };
        const customErrorFunc = catchAsyncError(async () => {
            throw customError;
        });
        await customErrorFunc(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalledWith(customError);
    });
});
