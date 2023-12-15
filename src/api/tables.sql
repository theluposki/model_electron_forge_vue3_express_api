PRAGMA foreign_keys = ON;

PRAGMA encoding = "UTF-8";

CREATE TABLE IF NOT EXISTS
    users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        birthDate INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        permission TEXT NOT NULL REFERENCES permissions(id)
    );


CREATE TABLE IF NOT EXISTS
    permissions (
        id TEXT PRIMARY KEY,
        permission TEXT UNIQUE NOT NULL,
        bgColor TEXT, 
        colorFont TEXT,
        description TEXT,
        authorizations JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


INSERT INTO permissions (id, permission, bgColor, colorFont, description, authorizations)
VALUES (
    '1ccb3a4b-e430-4bb2-b72d-82f5e9436c59',
    'administrador',
    '#c10006',
    '#ffffff',
    'O administrador possui acesso ilimitado a todas as seções do sistema ou da plataforma.',
    '["usuários","permições","produtos"]'
)
ON CONFLICT (id) DO NOTHING;
