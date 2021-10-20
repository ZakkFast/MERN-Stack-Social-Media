# MERN Stack Social Media Site [![license](https://img.shields.io/badge/license-MIT-blue)](https://shields.io)

### Tech Used:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Description:

This is a one page social media web app with a focus on the dev community. User's can sign up and create a profile where they can share their work and education history, skill sets, and share their projects with other devs. User's can also create posts, comment, and like or dislike posts. The website also makes use of Gravatar, allowing a user to sign up with an email linked to Gravatar and will automatically import and update the users profile whenever it is done on Gravatar's website.

### Code Snippets:

#### Route for liking an existing post.

```
// @route    Put api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
```

#### Function used to authenticate a user for routes in the backend

```
module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    await jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

```

### Screenshots:

WIP

### Deployed Links:

WIP

### Licensing:

[![license](https://img.shields.io/badge/license-MIT-blue)](https://shields.io)

### Contact:

- [Github](https://github.com/ZakkFast)
- [LinkedIn](https://www.linkedin.com/in/zachary-fast/)
- Email: webdev@zakkfast.com)

[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=ZakkFast&theme=dark)](https://github.com/anuraghazra/github-readme-stats)
