# Developers-Connector-web-app
This is my social network web app that helps to new developers to write posts and ask question from experince developers.
This is a MERN stack application from the "MERN Stack Front To Back" course on Udemy. 

https://fierce-escarpment-77863.herokuapp.com/

# Instructions
Add a default.json file in config folder with the following:
```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
 "jwtSecret": "secret",
 "githubToken": "<yoursecrectaccesstoken>"
}
```

Install server dependencies:
```
npm install
```

Install client dependencies:
```
cd client
npm install
```

Run both Express & React from root:
```
npm run dev
```

Enjoy!

