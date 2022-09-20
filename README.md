# Pley
Pley is a reverse yelp designed to help workers in service industries leave and find reviews of their clients.

**Link to project:** coming soon

![Pley dashboard](https://github.com/jericashall/pley/blob/main/demopic.jpg)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, Materialize

This is a full-stack application using express and node.js on the backend with an MVC architecture. For the front-end ejs controls all of the views and css and materialize are responsible for styling the app.

## Optimizations

Allow reviewers to add before and after pictures of their work done for clients.

## Lessons Learned:

The biggest take away I got from this project was that error messages that are sent to you may be the symptom of a bug instead of the cause of it. Check out the error message first, but if it seems correct do not narrow focus your attention there. Think 'what other bug could this be the symptom of.' For example, I was getting a mongoDB cast error trying to search for object Ids, but my code there was all correct. The actual problem was that my routes were set up in the wrong order so the wrong controller function was getting called.

