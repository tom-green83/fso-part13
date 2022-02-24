-- Creating table
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INT DEFAULT 0
);

-- Adding blogs to table
insert into blogs (author, url, title) values ('Dan Abramov', 'https://overreacted.io/on-let-vs-const/', 'On let vs const');
insert into blogs (author, url, title) values ('Laurenz Albe', 'https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/', 'Gaps in sequences in PostgreSQL');