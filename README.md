# Facebook Clone

## Description

Facebook Clone is a web application built with Next.js, Firebase, and TailwindCSS. It focuses on providing a clean and responsive user experience while following best practices in software design through the S.O.L.I.D principles. 

This application allows users to add new friends, login, sign up, create new post, see post.

## Features

- User authentication with Firebase.
    + on pause due to session issue.
- Create, and read posts
- Add new friend
- Responsive design using TailwindCSS
- Skeleton loader for a smooth loading experience
- Follows S.O.L.I.D principles for maintainable and scalable code

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Firebase**: For backend services including authentication and database management.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Skeleton Loader**: For providing a placeholder UI while content is loading.
- **S.O.L.I.D Principles**: A set of design principles to create more understandable, flexible, and maintainable software.

### Prerequisites

- Node.js (version v20.17.0)
- Nextjs (version 14.2.16)
- Firebase account

### Demo

https://facebook-clone-hosting.web.app

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vincent-softdev/facebook-clone-hosting.git

2. Setup firebase
3. get setup configuration
    Project Overview -> Project Settings -> Your apps -> SDK setup and configuration

4. Add the below field to .env.local

Data you will get from firebase
```bash
  apiKey: apiKey_string
  authDomain: authDomain_string,
  projectId: projectId_string,
  storageBucket: storageBucket_string,
  messagingSenderId: messagingSenderId_string,
  appId: appId_string
```

.env.local
NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:5033
NEXT_PUBLIC_FIREBASE_API_KEY=authDomain_string
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=authDomain_string
NEXT_PUBLIC_FIREBASE_PROJECT_ID=projectId_string
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storageBucket_string
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=messagingSenderId_string
NEXT_PUBLIC_FIREBASE_APP_ID=appId_string

### Running

1. install dependencies

```bash
npm install
```

2. run the project locally

```bash
npm run dev
```

3. build the project

```bash
npm run build
```

4. initial firebase emulators for local run

```bash
firebase init emulators
```

then select host

5. start emulators to see how does it look like when we deploy it

```bash
firebase emulators:start
```

6. deploy to firebase

```bash
firebase deploy
```

or deploy host only after first deploy. Cause `firebase deploy` will deploy everything include authentication, storage and others.

Deploy hosting only
```bash
firebase deploy --only hosting
```
