const generateUsername = (firstName: string, lastName: string) => {
	return `${firstName} ${lastName}` // Join first & last name
		.toLowerCase() // Convert to lowercase
		.normalize("NFD") // Normalize Unicode (handles accents)
		.replace(/[\u0300-\u036f]/g, "") // Remove diacritics (e.g., é → e)
		.replace(/[^a-z0-9]/g, "") // Remove non-alphanumeric characters
		.trim(); // Remove leading/trailing spaces
};

export default generateUsername;
