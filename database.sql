-- DB Name: pet-hotel

CREATE TABLE pets (
	id SERIAL PRIMARY KEY,
	petname VARCHAR(50),
	breed VARCHAR(50),
	color VARCHAR(50),
	
);

CREATE TABLE visit (
	visit_id SERIAL PRIMARY KEY,
	check_in BOOLEAN DEFAULT false,
	pet_id int REFERENCES pets (id) ON DELETE SET NULL);
