
function create(req, res) {
    const db = req.app.get('db');
  
    const { userId, content } = req.body;
  
    db.posts
    .insert(
      {
        userId,
        content,
      },
    )
    .then(posts => res.status(201).json(posts))
    .catch(err => {
      console.error(err);
    });
  }

function fetch(req, res) {
    const db = req.app.get('db');
    let pc = []
    if(req.query.comments ===""){
        db.posts
        .findOne({
            id: req.params.id,
        })
        .then(posts => {
            pc.push(posts)
            let pID = posts.id;
            db.comments
            .find({
                postId: pID,
            })
                .then(comments => {
                    pc.push(comments)
                    res.status(200).json(pc)
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });

    }else{
        db.posts
        .findOne({
            id: req.params.id,
        })
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
    }
    
}

function fetchAll(req, res) {
    const db = req.app.get('db');

    db.posts
      .find({
        userId: req.params.id,
      })
      .then(posts => res.status(200).json(posts))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
}

function update(req, res) {
    const db = req.app.get('db');
  
    const {content } = req.body;
  
    db.posts
    .update(
      {
        id: req.params.id,
      },
      {
        content: content,
      },
    )
    .then(posts => res.status(201).json(posts))
    .catch(err => {
      console.error(err);
    });
  }

 module.exports = {
    create,
    fetch,
    fetchAll,
    update
  };