# CINESEEK - Movie Search App

CINESEEK is a movie search application built using Angular CLI, which integrates with the OMDB API to search for movies based on queries. The application allows users to view search results, sort them, and move columns within the table for better flexibility.

## Features

- **Movie Search**: Search movies based on various queries like title, year, genre, and more.
- **Sort Results**: Sort movie search results by columns like title, year, etc.
- **Move Columns**: Reorder columns by dragging and dropping them for a customized view.
- **OMDB API Integration**: Fetch movie data from the OMDB API.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (20.11.1 or later)
- **Angular CLI** (19.2.0 or later)

## Setup and Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/cineseek.git
```

### 2. Install Dependencies

Navigate to the project folder and install the required dependencies:

```bash
cd cineseek
npm install
```

### 3. Add OMDB API Key

To interact with the OMDB API, you'll need a valid API key. Follow these steps to add your API key:

- Go to [OMDB API website](https://omdbapi.com/) and sign up for an API key if you don't have one.
- Once you have your API key, open the **src/environments/environment.ts** file in your project.
- Paste your API key into the apiKey property:

```bash
export const environment = {
  apiKey: 'YOUR_OMDB_API_KEY_HERE'  // Replace with your API key
};
```

### 4. Run the Application

Once you've added the API key, you can start the development server:

```bash
ng serve
```

The application will be running at http://localhost:4200.

### 5. Build the Application

To create a production build of the application, run:

```bash
ng build --configuration=production
```

This will build the application and output the files in the dist/ directory.

### License

This project is licensed under the MIT License.
