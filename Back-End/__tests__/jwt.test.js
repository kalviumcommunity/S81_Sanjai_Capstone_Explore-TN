const jwt = require('jsonwebtoken');

// Mock JWT_SECRET for testing
const TEST_JWT_SECRET = 'test_secret_key_for_jest_testing';

describe('JWT Token Generation and Validation Tests', () => {

    // Test 1: Should generate valid JWT token
    test('should generate a valid JWT token', () => {
        const payload = { id: '12345', email: 'test@example.com' };
        const token = jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: '1d' });

        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    // Test 2: Should decode token correctly
    test('should decode token and retrieve payload', () => {
        const payload = { id: '67890', email: 'user@example.com', name: 'Test User' };
        const token = jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: '1d' });

        const decoded = jwt.verify(token, TEST_JWT_SECRET);

        expect(decoded.id).toBe(payload.id);
        expect(decoded.email).toBe(payload.email);
        expect(decoded.name).toBe(payload.name);
    });

    // Test 3: Should reject invalid token
    test('should reject invalid token', () => {
        const invalidToken = 'invalid.token.string';

        expect(() => {
            jwt.verify(invalidToken, TEST_JWT_SECRET);
        }).toThrow();
    });

    // Test 4: Should reject token with wrong secret
    test('should reject token signed with different secret', () => {
        const payload = { id: '11111', email: 'test@test.com' };
        const token = jwt.sign(payload, 'wrong_secret', { expiresIn: '1d' });

        expect(() => {
            jwt.verify(token, TEST_JWT_SECRET);
        }).toThrow();
    });

    // Test 5: Should include expiration in token
    test('should include expiration time in token', () => {
        const payload = { id: '22222', email: 'expire@test.com' };
        const token = jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: '1h' });

        const decoded = jwt.verify(token, TEST_JWT_SECRET);

        expect(decoded.exp).toBeDefined();
        expect(decoded.iat).toBeDefined();
        expect(decoded.exp).toBeGreaterThan(decoded.iat);
    });

    // Test 6: Should handle expired tokens
    test('should detect expired tokens', (done) => {
        const payload = { id: '33333', email: 'expired@test.com' };
        // Create token that expires in 1 second
        const token = jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: '1s' });

        // Wait 2 seconds and verify it's expired
        setTimeout(() => {
            expect(() => {
                jwt.verify(token, TEST_JWT_SECRET);
            }).toThrow();
            done();
        }, 2000);
    });
});
