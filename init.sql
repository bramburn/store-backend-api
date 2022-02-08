CREATE USER udacity WITH PASSWORD 'Sandal5-Yesterday-Dawdler';
CREATE DATABASE IF NOT EXISTS udacity_store;
GRANT ALL PRIVILEGES ON DATABASE udacity_store TO udacity;
CREATE DATABASE udacity_store_test;
GRANT ALL PRIVILEGES ON DATABASE udacity_store_test TO udacity;
