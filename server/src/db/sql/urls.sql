CREATE TABLE
    urls (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        original_url TEXT NOT NULL,
        short_code VARCHAR(8) UNIQUE NOT NULL,
        click_count INT DEFAULT 0,
        user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );