const bcrypt = require('bcrypt');

describe('Password Hashing and Validation Tests', () => {

    // Test 1: Password should be hashed correctly
    test('should hash password correctly', async () => {
        const plainPassword = 'testPassword123';
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toBe(plainPassword);
        expect(hashedPassword.length).toBeGreaterThan(0);
    });

    // Test 2: Hashed password should match original password
    test('should verify correct password against hash', async () => {
        const plainPassword = 'mySecurePassword456';
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

        expect(isMatch).toBe(true);
    });

    // Test 3: Wrong password should not match hash
    test('should reject incorrect password', async () => {
        const correctPassword = 'correctPassword789';
        const wrongPassword = 'wrongPassword000';
        const hashedPassword = await bcrypt.hash(correctPassword, 10);

        const isMatch = await bcrypt.compare(wrongPassword, hashedPassword);

        expect(isMatch).toBe(false);
    });

    // Test 4: Different hashes for same password (salt randomness)
    test('should generate different hashes for same password', async () => {
        const password = 'samePassword123';
        const hash1 = await bcrypt.hash(password, 10);
        const hash2 = await bcrypt.hash(password, 10);

        expect(hash1).not.toBe(hash2);

        // But both should verify correctly
        expect(await bcrypt.compare(password, hash1)).toBe(true);
        expect(await bcrypt.compare(password, hash2)).toBe(true);
    });

    // Test 5: Empty password handling
    test('should handle empty password', async () => {
        const emptyPassword = '';
        const hashedPassword = await bcrypt.hash(emptyPassword, 10);

        expect(hashedPassword).toBeDefined();
        expect(await bcrypt.compare(emptyPassword, hashedPassword)).toBe(true);
        expect(await bcrypt.compare('notEmpty', hashedPassword)).toBe(false);
    });
});
