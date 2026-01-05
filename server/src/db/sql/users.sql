CREATE TABLE
    IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        name VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );