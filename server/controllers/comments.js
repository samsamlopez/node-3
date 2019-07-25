
function create(req, res) {
    const db = req.app.get('db');
  
    const { userId, postId, comment } = req.body;
  
    db.comments
    .insert(
      {
        userId,
        postId,
        comment,
      },
    )
    .then(comments => res.status(201).json(comments))
    .catch(err => {
      console.error(err);
    });
  }

  function update(req, res) {
    const db = req.app.get('db');
  
    const {newComment } = req.body;
    const postId = parseInt(req.query.postId)
  
    db.comments
    .update(
      {
        userId: req.params.id,
        postId: postId,
      },
      {
        comment: newComment,
      },
    )
    .then(comments => res.status(201).json(comments))
    .catch(err => {
      console.error(err);
    });
  }

module.exports = {
    create,
    update
  };