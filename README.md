# Facebook Clone

## Description

Facebook Clone is a web application built with Next.js, Firebase, and TailwindCSS. It focuses on providing a clean and responsive user experience while following best practices in software design through the S.O.L.I.D principles. 

This application allows users to add new friends, login, sign up, create new post, see post.

## Design Patterns
- Compound Components: https://www.smashingmagazine.com/2021/08/compound-components-react/
- Single Responsibility Principle (SRP): https://www.geeksforgeeks.org/single-responsibility-in-solid-design-principle/

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
<img width="1482" alt="Screenshot 2024-11-01 at 10 16 52 am" src="https://github.com/user-attachments/assets/ac7f2179-a98f-409f-99cf-a21a9fde1fb8">
<img width="1450" alt="Screenshot 2024-11-01 at 10 17 11 am" src="https://github.com/user-attachments/assets/58cb571c-13fa-47d1-b432-b81388dcf684">
<img width="1467" alt="Screenshot 2024-11-01 at 10 17 23 am" src="https://github.com/user-attachments/assets/029d1faa-9238-4603-aefe-eccb22eb452d">
<img width="1434" alt="Screenshot 2024-11-01 at 10 17 31 am" src="https://github.com/user-attachments/assets/b69698bb-9d9a-4fae-b8c0-f562597a1c0d">
<img width="1460" alt="Screenshot 2024-11-01 at 10 17 40 am" src="https://github.com/user-attachments/assets/4f1b3584-5089-4631-81a2-af3bd7175f6b">



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
