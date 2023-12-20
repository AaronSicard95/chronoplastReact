This site: Chronoplast Records
Is deployed to: https://chronoplast.surge.sh
The backend api is hosted on: https://chronoplastrecords-d8c7d4480b1a.herokuapp.com

The website is used as a  database for records and their associated bands
for people to look up information on these bands/records as well as
review rate the listted records. Users also have the ability to order records if there are litings for them made by the admin. At the time of writing I have only made the checkout process clear the cart and submit a test payment (woth no card info) to square which I have working. In the future I will implement shipping APIs and take actual payments.

At the time of writing tests are not implemented but will be created in the future.
Edit: tests for Routes have been created

The flow starts with the admin creating records/bands/listings for the users to peruse. The users will go on the site and see the top 5 rated records on the site. If they go to their page they can read reviews look at available listings to purchase as well as click the band or associated genres and be taking to their related pages will also allow them to dig deeper into their relations. The user also has the ability to search for bands/records by name or bio. They can them put listings into their cart and checkout.

The api is hosted as stated aboce. Created by me, the process started with figuring out what I would need databse/route/model wise and creating them. Once that was done I started on the front end and figured out what things were missing and added them as the front was being built, like the front end at time of writing there are no tests (except for users) but will be added soon.

I used:
"@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@reduxjs/toolkit": "^1.9.7",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.3",
    "react-router-dom": "^6.20.0",
    "react-scripts": "5.0.1",
    "react-select": "^5.8.0",
    "reactstrap": "^9.2.1",
    "redux": "^4.2.1",
    "redux-toolkit": "^1.1.2",
    "web-vitals": "^2.1.4"
    "@aws-sdk/client-s3": "^3.472.0",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jest": "^29.7.0",
    "jsonschema": "^1.4.1",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^3.0.1",
    "node": "^21.1.0",
    "pg": "^8.11.3",
    "square": "^33.0.0",
    "supertest": "^6.3.3",
    "uuid": "^9.0.1"
as well as the squarePayments API, surge(which was down when I attempted to deploy hence vercel), and heroku.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
