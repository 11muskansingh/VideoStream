# Videostream

**Videostream** is the backend service for a comprehensive YouTube clone, providing a robust and scalable infrastructure to support video sharing, user management, and interactive features. This repository contains the backend implementation using Express.js, MongoDB, and Node.js.

## Features

### User Authentication
- **Sign Up & Login**: Users can create a new account or log in to an existing one. User information is securely stored, and login sessions are managed to ensure secure access to all features.
- **Session Management**: After logging in, users remain authenticated until they choose to log out, ensuring smooth navigation across the app.

### Video Search and Categories
- **Browse by Categories**: Videos are organized into various categories (e.g., Entertainment, Education, Sports), allowing users to explore and discover content based on their preferences.
- **Keyword Search**: Users can search for videos by typing keywords, making it easy to find specific videos or content within a genre of their choice.

### Like and Comment on Videos
- **Liking Videos**: Users can like videos they enjoy, and each like is counted, giving creators a sense of their audience’s engagement.
- **Commenting**: Users can add comments on videos, facilitating interaction between users and content creators. Each comment is timestamped and can be read by other users.

### Related Videos
- **Recommendations**: When a video is selected, YouView automatically displays related videos on the side, helping users find similar content. This feature improves discoverability and keeps users engaged by suggesting relevant videos.

### Upload Videos
- **Personal Uploads**: Authenticated users can upload videos directly from their profile, allowing them to contribute to the platform.
- **Profile Storage**: Videos uploaded by a user are accessible on their profile, providing a portfolio of their content.
- **File Handling**: Files are uploaded through Multer and stored on Cloudinary, ensuring smooth upload and secure storage of media content.

### Watch History Management
- **View Watch History**: Users can view a list of all the videos they’ve recently watched, helping them revisit content they found interesting.
- **Remove from History**: If users prefer to clean up their watch history, they can remove specific videos, giving them control over what appears in their history list.

### Liked Videos
- **Favorites List**: Every video a user has liked is stored in a dedicated "Liked Videos" section, making it easy for users to find and re-watch their favorite content.

### User Logout
- **Secure Logout**: When users are done, they can securely log out of their account, ensuring their information remains safe.

## Tech Stack

- **Backend**: 
  - Node.js and Express.js for server-side logic and API handling.
  - MongoDB for data storage, including user accounts, video information, comments, and likes.

- **Frontend**: 
  - React.js for building the user interface and managing state.
  - Tailwind CSS for styling and responsive design.

- **Authentication**:
  - JSON Web Tokens (JWT) for managing user sessions securely.

- **File Storage**:
  - Multer for handling file uploads.
  - Cloudinary for storing and delivering video files, ensuring high-quality media storage.

## Frontend Repository - Youview

The frontend code for YouView is located in a separate repository named [YouView](https://github.com/11muskansingh/YouView).


