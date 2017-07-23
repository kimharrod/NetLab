# NetLab
Virtual lab environment for students &amp; teachers

### Overview

Netlab is implemented with a MERN stack - MongoDB/Mongoose, Express, React and Node.
It also uses Firebase for user authentication, profiles & real-time sync of notes. 

You start the app from the command line using "node server.js".

### Purpose

NetLab allows instructors & students to work and collaborate in a virtual lab environment.

Instructors can upload slide sets and add annotations to slides.

Students view & study slides using the virtual microscope, which allows for zooming and panning throughout a tissue, all the way down to the cellular level.

Students can add their own notes to slides, save notes and pin important slide locations for later reference.

### Dependencies and Packages

The app requires the 'mongoose', 'express', 'react', 'react-dom', 'react-router', 'reactfire', 'firebase', 'firebaseui', request', 'body-parser' and 'morgan' npm packages.

Development dependencies are as follows: 'webpack', babel-core' 'babel-loader', 'babel-preset-react' and'babel-preset-es2015'.
  
### Database Implementation

MongoDB is used to store static slide source information (tissue name, system name, magnification).

Firebase is used for user details, authentication & real-time sync of user notes. 

