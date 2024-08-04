# DOCUMENTATION

## 1. Introduction

This project create a website base on [Reddit](https://www.reddit.com), a social network platform. The website focus on allowing everyone to share their contents with each other, and express their opinion.

## 2. Technologies

- The website use [Angular](https://angular.dev) for the front-end, and [Spring](https://spring.io) for back-end.
- [PostgreSQl](https://www.postgresql.org) is used to store data about users, posts, and communities.
- [MongoDB](https://www.mongodb.com) is used to store data about comments.
- [Cloudary](https://cloudinary.com) is used to store images and videos use in posts and communities.
This repository is the front-end part of the project. The back-end part can be found here: [backend_github_link](https://github.com/Trxyzng37/spring)

## 3. Functions

The website has the following functions:

- User can sign-up and sign-in using username password, or using Google account.
- User can create, edit, delete posts, communities and comments.
- User can search for communities or other people using name.
- User can sort posts's order base on time and upvote numbers.
- User can upvote or downvote a post, and save post to view later.
- Moderator of a community can control either a post is allow or not in a community.

*Community*: community is a place where user can submit content that follow the community's interest. A community is created by a user, and the user is also have the ability to control which content can be shown on the community by moderate it.

*Post*: post is a piece of content that is submitted to the website. A post can be text, image, video or link. post can be created and submitted to a community by any user.

## 4. Run the application locally

- Clone the repository:
`git clone https://github.com/Trxyzng37/angular.git`

- Download requirements:
`npm install`

- Run the application:
`npm start`

The above command will run the application locally at address: [http://127.0.0.1:4200](http://127.0.0.1:4200)

- Build the application:
`ng build --configuration=development`

The output will be in the **output** folder.