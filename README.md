# **Movie and Show Tracker App**

This is a React Native application designed to enhance your movie and TV show tracking experience. Built with Expo, the app provides a seamless way to categorize and manage your "Watched" and "To Watch" lists. It integrates with RapidMock APIs to fetch and manage dynamic movie data, offering features like searching, sorting, filtering, and toggling between grid and list views.

---

## **Features and Usage**

### **Home Screen**
- **Explore**: See the list of all available movies and shows
- **Search**: Find movies and shows by title using the search bar.
- **Grid/List Toggle**: Switch between grid and list views for a personalized display.
- **Sort A-Z**: Sort the movie list alphabetically.
- **Filter by Type**: Filter content by type (movies/shows).
- **Movie Navigation**: Tap on a movie or show to view detailed information.
- **Pull-to-Refresh**: Reload data by pulling down on the list.

### **My List Screen**
- **Categorized Lists**: View "Watched" and "To Watch" movies in separate sections fetched dynamically from the API.
- **Grid/List Toggle**: Customize the view to display movies in a grid or list format.
- **Movie Navigation**: Tap on a movie or show to navigate to the details page.
- **Pull-to-Refresh**: Refresh the lists to see updated lists.

### **Details Screen**
- **Movie Information**: View detailed information about a movie.
- **Toggle Status**: Mark the movie as "Watched," "To Watch," or clear the status entirely.
- **Back Navigation**: Use the back icon to return to the previous screen.

### **Global Features**
- **Navigation**: Consistent app-wide header featuring the app name and navigation icons.
- **Hamburger Menu**: Clicking the icon gives a demo message
- **Profile Icon**: Navigates to Profile Screen that displays user information.
- **Dynamic State Management**: Each screen updates dynamically based on user actions or API data.

---

## **Assumptions**

1. Data is fetched dynamically from a mock API hosted on **RapidMock**.
2. The app assumes static user information for the profile screen.
3. Sorting, grid/list toggle, and filtering are implemented as local UI features.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v14 or higher)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or an Android/iOS device for testing

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/shreyam462/movie-show-tracker.git

   cd movie-tracker-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app in development mode:
   ```bash
   expo start
   ```

4. Open the app on your device:
   - Scan the QR code using the Expo Go app on your phone(Android/iOS).
   - Use an Android/iOS emulator or simulator.

---

## **API Endpoints**

The app uses the following **RapidMock API** endpoints:

1. **All Movies**:
   - **Endpoint**: `/movies/all`
   - **Description**:  Retrieves a list of all available movies.

2. **Movies List**:
   - **Endpoint**: `/movies`
   - **Query Parameters**: id (integer, required): The unique identifier for the movie
   - **Description**: Fetches detailed information about a specific movie based on the provided movie ID.

3. **My List**:
   - **Endpoint**: `/mylist`
   - **Description**: Fetches categorized lists of "Watched" and "To Watch" movies.

4. **Add to List**:
   - **Endpoint**: `/mylist/add`
   - **Description**: Updates the movie status to "Watched" or "To Watch."

---

## **Screenshots**

### Home Screen

![Home Screen](screenshots/home.png)

### My List Screen

![My List Screen](screenshots/mylist.png)

### Details Screen

![Details Screen](screenshots/details.png)

---

## **APK**

Download the APK to install and test the app on your Android device:
- [Download APK](https://example.com/download/apk)

---

## **Video Demonstration**

Watch a video demonstration showcasing the main flows and features of the app:
- [Watch Video](https://example.com/demo/video)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## **Author**

**Shreya Mishra**  
- [Gmail](mailto:shreya.m462@gmail.com)
- [GitHub Profile](https://github.com/shreyam462)  
- [LinkedIn Profile](https://www.linkedin.com/in/your-linkedin-profile)  

---