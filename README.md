## 📑 Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Features](#features)
4. [API](#api)
5. [Installation and usage](#installation-and-usage)

## 🎬 Introduction <a name="introduction"></a>
Movie Findr is a dynamic web application dedicated to helping users discover movies effortlessly. 
<br />
Built with a passion for cinema and technology, this project offers a sleek, user-friendly platform for movie enthusiasts.

## 💻 Technologies <a name="technologies"></a>
* Vite - build tool
* TypeScript - logic creation
* React.js - building UI
* Tailwind CSS - styling
* React Router - routing and navigation
* React Icons - library for icons
* SWR - library for fetching data
* Docker - containerized deployment


## 🌟 Features <a name="features"></a>
* TMDB (The Movie Database) API Integration
* Movie Search Functionality:
  * Search for movies using user input
  * Display suggestions based on search queries
  * Icon and functionality for clearing search inputs
* Detailed Movie Information:
  * Includes poster, movie name, release year, short summary, cast, director, YouTube trailer, similar movie suggestions, rating, popularity, genre, country, budget, and revenue
* Latest Movies Display
* Popular Movies by Genre:
  * Categorizes and displays popular movies across different genres.
* Advanced Filtering Options:
  * Filter movies by year, genres, duration, and rating.
  * Supports multiple selections and the ability to reset individual or all filters
  * Sort results by popularity, highest rated, or newest
* Favorites:
  * Add or remove movies from favorites
  * Visual feedback with text changes and icon color updates based on the favorites status

## 🔗 API <a name="api"></a>
MovieFindr fetches movie data from the TMDB (The Movie Database) API. The integration enables the application to provide movie search functionality, display detailed movie information, and help users discover new films based on their preferences. The TMDB API is essential for accessing a wide range of movie details, supporting the app's core features.

## 🛠️ Installation and usage <a name="installation-and-usage"></a>
1. git clone https://github.com/valentinaotocan/movie-findr
2. cd movie-findr
3. npm install
4. Create a `.env` file in the root directory
5. Inside the `.env` file, add `VITE_API_KEY = yourTMDBKey`
6. npm run dev 
<br />
or using Docker:  <br />
&nbsp 1. git clone https://github.com/valentinaotocan/movie-findr <br />
&nbsp 2. cd movie-findr <br />
&nbsp 3. docker build -t movie-findr . <br />
&nbsp 4. docker run -p 3000:3000 movie-findr
