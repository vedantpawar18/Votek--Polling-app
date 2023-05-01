# Votek
Votek App is a real-time polling application built using Firebase Realtime Database and React. It allows admins to create polls and share them with others to gather their opinions or preferences. Users can vote on polls and admin can see real-time updates on the poll results. The app provides a user-friendly interface for creating and managing polls and displays the results of the poll in various formats such as graphs and charts.

The backend of the Votek App is built using Firebase Realtime Database, MongoDb and Express.js, while the frontend is built using React. Socket.IO is used for real-time communication between the server and the client, allowing admin to see live updates on poll results.

This app can be used for various purposes such as conducting surveys, gathering feedback, and decision making. It provides an efficient way of gathering opinions from a large number of people in a short time.
![votek](https://user-images.githubusercontent.com/101568818/232305827-3354019c-2060-41cd-bafb-4956c1805858.png)

# Step to cloning repo

```bash
# Clone repository
$ git clone https://github.com/masai-builds/Votek
```
Install dependencies via NPM 

```bash
# Install dependencies for frontend
$ cd client
$ npm install
$ npm start
$ cd ..

# Install dependencies for backend
$ cd client
$ npm install
$ npm start
$ cd ..
```

# Authors: 

Pratik Dutta (EM/Project Guide)

1. Suraj Kumar Gupta:
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/Surajbnp)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/suraj-kumar-gupta-058191222/) 

2. Vedant Pawar:
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/vedantpawar18)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vedant-pawar-5319791b5/) 

3. Arun Raj MK: 
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/rk6093720)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rohit-kumar-6b1b421a9/) 

4. Ashwini Prewar: 
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/Aniruddha8787)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anirudh87/) 

5. Anusha Surendran: 
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/mayra111)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muskan-gupta01/) 


# Tech-Stack used : 
![home](https://img.shields.io/badge/html-FF4154?style=for-the-badge&logo=Html&logoColor=white)
![home](https://img.shields.io/badge/css-F26B00?style=for-the-badge&logo=Css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![home](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) 
![home](https://img.shields.io/badge/JSS-F7DF1E?style=for-the-badge&logo=JSS&logoColor=white)
![home](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![home](https://img.shields.io/badge/git-000000?style=for-the-badge&logo=Git&logoColor=white)
![mongoDB](https://img.shields.io/badge/MongoDB-43B02A?style=for-the-badge&logo=MongoDB&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![home](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) 
![home](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![home](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![home](https://img.shields.io/badge/Postman-FF4154?style=for-the-badge&logo=Postman&logoColor=white)

# API :
### Users
- POST user/signup
- POST auth/signin
- GET  user/user-details
- POST firebase/vote
- GET  firebase/live-poll/:pollId

### Admin : 
- POST firebase/create-poll
- GET  firebase/live-polls
- POST poll/save-poll
- GET  poll/ended-polls
- POST poll/polls/votedBy
- POST poll/download/votedby/:pollId/question/:questionId/option/:optionId
- POST template/save-template
 
## To Create a Poll :
### Sign in as admin :
### Credentials : 
- Email: admin@gmail.com
- Password: 12345678

# Features :
- User friendly and responsive web design
- Made with mobile first approach
- Sign Up with email and password
- Admins can create three types of polls: poll, multi-select, and rating.
- After creating a poll, admins can share the poll URL with others via social media, email, or other means.
- Admins can view real-time data on the number of votes cast for each option.
- Admins can see who has voted in the poll and which option they selected.
- Admins can download an Excel sheet with detailed information on all votes cast.
- Users must log in to the app to vote, ensuring that only authorized users can cast their ballots.
- Users can select the options they want to vote for and submit their votes.
- Ensure that the voting system is secure and free from tampering or manipulation.

# Pages : 
## Dashboard : 
![votek](https://user-images.githubusercontent.com/101568818/232305888-67235c1a-6f29-4991-a33f-a604a184b783.png)

![screenshot-votek netlify app-2023 04 29-08_58_14](https://user-images.githubusercontent.com/101568818/235281450-89d5638a-a0f7-44de-b98b-eccacd944295.png)

![screenshot-votek netlify app-2023 05 01-19_31_12](https://user-images.githubusercontent.com/101568818/235462833-3676056e-8e52-436a-9edd-edad25820aca.png)

![screenshot-votek netlify app-2023 04 29-08_58_48](https://user-images.githubusercontent.com/101568818/235281464-9b9586e8-3c20-4b06-aa75-c68c9e84dc28.png)

## Deployment Link: 
https://votek.netlify.app/

## Feedback: 
If you have any feedback, any suggestion please reach out to us at 
vedantpawar18@gmail.com







