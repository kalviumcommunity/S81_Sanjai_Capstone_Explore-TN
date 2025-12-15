describe('User Input Validation Tests', () => {

    // Helper function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Helper function to validate password strength
    const isValidPassword = (password) => {
        return password !== null && password !== undefined && password.length >= 6;
    };

    // Helper function to validate name
    const isValidName = (name) => {
        return !!(name && name.trim().length >= 2);
    };

    // Test 1: Email validation - valid emails
    test('should validate correct email formats', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('user.name@domain.co.in')).toBe(true);
        expect(isValidEmail('admin123@test.org')).toBe(true);
    });

    // Test 2: Email validation - invalid emails
    test('should reject invalid email formats', () => {
        expect(isValidEmail('invalid.email')).toBe(false);
        expect(isValidEmail('@example.com')).toBe(false);
        expect(isValidEmail('user@')).toBe(false);
        expect(isValidEmail('user @example.com')).toBe(false);
        expect(isValidEmail('')).toBe(false);
    });

    // Test 3: Password validation - valid passwords
    test('should validate strong passwords', () => {
        expect(isValidPassword('password123')).toBe(true);
        expect(isValidPassword('SecurePass!')).toBe(true);
        expect(isValidPassword('123456')).toBe(true);
    });

    // Test 4: Password validation - weak passwords
    test('should reject weak passwords', () => {
        expect(isValidPassword('12345')).toBe(false);
        expect(isValidPassword('abc')).toBe(false);
        expect(isValidPassword('')).toBe(false);
        expect(isValidPassword(null)).toBe(false);
    });

    // Test 5: Name validation
    test('should validate user names correctly', () => {
        expect(isValidName('John Doe')).toBe(true);
        expect(isValidName('Alice')).toBe(true);
        expect(isValidName('A')).toBe(false);
        expect(isValidName('')).toBe(false);
        expect(isValidName('  ')).toBe(false);
    });

    // Test 6: User registration data validation
    test('should validate complete user registration data', () => {
        const validUser = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securePass123'
        };

        const invalidUser1 = {
            name: 'J',
            email: 'john@example.com',
            password: 'securePass123'
        };

        const invalidUser2 = {
            name: 'John Doe',
            email: 'invalid-email',
            password: 'securePass123'
        };

        const invalidUser3 = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '123'
        };

        // Valid user
        expect(isValidName(validUser.name)).toBe(true);
        expect(isValidEmail(validUser.email)).toBe(true);
        expect(isValidPassword(validUser.password)).toBe(true);

        // Invalid users
        expect(isValidName(invalidUser1.name)).toBe(false);
        expect(isValidEmail(invalidUser2.email)).toBe(false);
        expect(isValidPassword(invalidUser3.password)).toBe(false);
    });

    // Test 7: Array validation for favorites
    test('should validate favorites array operations', () => {
        let favorites = [];

        // Add favorite
        favorites.push('Place1');
        expect(favorites).toContain('Place1');
        expect(favorites.length).toBe(1);

        // Add another
        favorites.push('Place2');
        expect(favorites.length).toBe(2);

        // Remove favorite
        favorites = favorites.filter(f => f !== 'Place1');
        expect(favorites).not.toContain('Place1');
        expect(favorites.length).toBe(1);
    });
});
