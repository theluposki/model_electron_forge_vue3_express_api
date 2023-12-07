PRAGMA foreign_keys = ON;

PRAGMA encoding = "UTF-8";

CREATE TABLE IF NOT EXISTS
    users (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        imagem TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        data_nascimento INTEGER NOT NULL,
        autorizacao TEXT DEFAULT '["basic"]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );