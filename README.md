
# Bettermode Take Home

This project is a web application created as part of the application process for the Senior Front-End Engineer position at Bettermode. The application showcases skills with modern web technologies including Vite, React, TypeScript, and Tailwind CSS. It features a paginated gallery of posts with detailed views and interactive elements, leveraging GraphQL for data fetching and mutations.



## Installation
To get a local copy up and running follow these simple steps.

### Prerequisites
Make sure you have the following installed:
- Node.js >= 18.x
- npm

### Installation Steps
1. Clone the repository
    ```bash
    git clone https://github.com/danditomaso/bettermode-take-home.git
    ```
2. Navigate to the project directory
    ```bash
    cd bettermode-take-home
    ```
3. Install the dependencies
    ```bash
    npm install
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, these variables are already specified in the .env.example which can be copied and renamed to .env. If these values are not present the project will throw an error when trying to run it in either development or production mode 

`VITE_ACCESS_TOKEN`
To obtain this value, you'll need to visit any deployed Bettermode site, open your browser developer tools, and the GraphQL Network browser add-in. Look for any Query, and select "Headers", from here you will see a header named "authorization", this is the value you want to copy. Make sure to copy the entire string, omitting the Bearer portion. This will now be the value of the `VITE_ACCESS_TOKEN` environment variable.

![Where to find access token](./assets/access-token.png)

`VITE_SPACE_ID`
To obtain this value, you'll need to visit any deployed Bettermode site, open your browser developer tools, and the GraphQL Network browser add-in.
Look at any Query that has the name "GetPosts" or "GetPost", select one of them and click the Response tab. Inside the Response window, you'll have to exapnd the data object until you see a series of keys, search for one named "spaceId" and copy that value, this should become the value of the `VITE_SPACE_ID` environment variable.  

![Where to find the space ID](./assets/space-id.png)

## Run Locally

After cloning the project in the previous step

To run the project locally, use the following command:
```bash
npm run dev
```

## Deployment

First, build the app for production:

```bash
npm run build
```

Then run the app in production mode:

```bash
npm start
```

## Features

- Displays a paginated list of posts in a gallery format.
- Includes a "Show More" button to load additional posts.
- Allows users to click on a post to view its details on a separate page.
- Responsive design
- Minimalist UI aesthetics
- Integrates a "Like" button on both the gallery view and the detail page of each post, displaying the current number of likes and updating this count upon user interaction.
-  Utilizes React Router for navigation between the gallery and individual post details.
- Uses URQL as the GraphQL client, with data fetching performed client-side.

## Tech Stack

### Client
- Typescript 
- React 
- React Router/Remix 
- TailwindCSS 
- URQL 

### Server 
- Remix


## Screenshots

![Dashboard View](./assets/dashboard.png)

![All Posts View](./assets/allposts.png)

![Details Post View](./assets/detail.png)


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

To check coverage, run the following command

```bash
   npm run coverage
```

## Known Issues

The "Like" button may get out of sync with the post's liked status due to the component using a useEffect. The local state in the like button is a workaround that can be removed once optimistic caching of reaction status is added.

## Support

For support, please email dan.ditomaso@gmail.com

