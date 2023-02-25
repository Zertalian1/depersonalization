CREATE USER connection2 WITH PASSWORD 'secret' CREATEDB;
CREATE DATABASE BigCaseClubDepersonalize
    WITH
    OWNER = connection2
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;