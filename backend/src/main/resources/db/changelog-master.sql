-- liquibase formatted sql

-- changeset Milan:0
CREATE SCHEMA IF NOT EXISTS milanify;

-- changeset Milan:1
CREATE TABLE IF NOT EXISTS milanify.users (
    id uuid,
    username VARCHAR(255),
    firstname VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255) unique,
    password text,
    date_of_birth DATE,
    signed_up TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS milanify.admins(
    user_id uuid,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES milanify.users(id)
);

CREATE TABLE IF NOT EXISTS milanify.verification_codes(
    email VARCHAR(255),
    code text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (email),
    FOREIGN KEY (email) REFERENCES milanify.users(email)
);

CREATE TABLE IF NOT EXISTS milanify.email_transfer(
    original_email VARCHAR(255),
    new_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS milanify.roles(
    role_id SERIAL NOT NULL,
    role_name VARCHAR(255),
    PRIMARY KEY (role_id)
);

INSERT INTO milanify.roles (role_name) VALUES ('ADMIN');
INSERT INTO milanify.roles (role_name) VALUES ('USER');
INSERT INTO milanify.roles (role_name) VALUES ('OWNER');

CREATE TABLE IF NOT EXISTS milanify.user_roles(
    user_id uuid,
    role_id int,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES milanify.users(id),
    FOREIGN KEY (role_id) REFERENCES milanify.roles(role_id)
);

CREATE TABLE IF NOT EXISTS milanify.sites(
    id uuid,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS milanify.pages(
    id uuid,
    site_id uuid,
    page_name VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (site_id) REFERENCES milanify.sites(id)
);

CREATE TABLE IF NOT EXISTS milanify.user_to_site(
    user_id uuid,
    site_id uuid,
    PRIMARY KEY (user_id, site_id),
    FOREIGN KEY (user_id) REFERENCES milanify.users(id),
    FOREIGN KEY (site_id) REFERENCES milanify.sites(id)
);

CREATE TABLE IF NOT EXISTS milanify.composer_autosave_states(
    page_id uuid,
    saved_state json,
    updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (page_id),
    FOREIGN KEY (page_id) REFERENCES milanify.pages(id)
);

CREATE TABLE IF NOT EXISTS milanify.composer_last_saved_states(
    page_id uuid,
    saved_state json,
    updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (page_id),
    FOREIGN KEY (page_id) REFERENCES milanify.pages(id)
);

CREATE TABLE IF NOT EXISTS milanify.composer_published_states(
    page_id uuid,
    published_state json,
    updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (page_id),
    FOREIGN KEY (page_id) REFERENCES milanify.pages(id)
);

CREATE TABLE IF NOT EXISTS milanify.image_resources(
    id uuid,
    uploader_id uuid,
    page_id uuid,
    image_url VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (uploader_id) REFERENCES milanify.users(id),
    FOREIGN KEY (page_id) REFERENCES milanify.pages(id)
);

CREATE TABLE IF NOT EXISTS milanify.recovery_codes(
    email text,
    recovery_code text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (email),
    FOREIGN KEY (email) REFERENCES milanify.users(email)
);

-- changeset Milan:2
ALTER TABLE milanify.user_to_site
    add COLUMN site_name VARCHAR(255)
;

-- changeset Milan:3
CREATE TABLE IF NOT EXISTS milanify.footer_states(
    site_id uuid,
    footer_state json,
    updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (site_id),
    FOREIGN KEY (site_id) REFERENCES milanify.sites(id)
);

-- changeset Milan:4
CREATE TABLE IF NOT EXISTS milanify.navbar_mapping_states(
    site_id uuid,
    navbar_mapping_state json,
    updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (site_id),
    FOREIGN KEY (site_id) REFERENCES milanify.sites(id)
);

-- changeset Milan:5
CREATE TABLE IF NOT EXISTS milanify.published_site_records(
    site_id uuid,
    publish_timestamp timestamp,
    nav_bar json,
    main_body json,
    footer json,
    PRIMARY KEY (site_id, publish_timestamp),
    FOREIGN KEY (site_id) REFERENCES milanify.sites(id)
);

-- changeset Milan:6
CREATE TABLE IF NOT EXISTS milanify.subdomain_records(
    site_id uuid,
    subdomain VARCHAR(255),
    is_deployed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (site_id),
    FOREIGN KEY (site_id) REFERENCES milanify.sites(id)
);