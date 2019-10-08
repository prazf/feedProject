const express = require('express')
const app = express()
const router = express.Router();
const port = process.env.PORT || 3000;
const db = require('./db');
const feed = require('./model/customer')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.use(express.json())

// get all feeds
app.get('/getAllFeeds', (req, res) => {
    feed.findAll().then(feeds => {
        console.log("All feeds:", JSON.stringify(feeds, null, 4));
        res.status(200).send(feeds)
      }).catch(err=>console.log(err))
})
// get all feeds and sort by title
app.get('/sortByName', (req, res) => {
    feed.findAll(
        {            
            order: [
                ['name', 'ASC'],
            ]
        }
    ).then(feeds => {
        console.log("All feeds:", JSON.stringify(feeds, null, 4));
        res.status(200).send(feeds)
      }).catch(err=>console.log(err))
})

// get all feeds and sort by date
app.get('/sortByDate', (req, res) => {
    feed.findAll(
        {            
            order: [
                ['dateLastEdited', 'ASC'],
            ]
        }
    ).then(feeds => {
        console.log("All feeds:", JSON.stringify(feeds, null, 4));
        res.status(200).send(feeds)
      }).catch(err=>console.log(err))
})
// search using regex
app.get('/search/:desc', (req, res) => {
feed.findAll({
    where: {
        description: {
          [Op.like]: `%${req.params.desc}%`
            }
        }
        }).then(() => {
            console.log("search retrieved");
            res.status(200).send({message:"search retrieved"})
        }).catch(err => {
            console.error('Unable to retrieve:', err);
          });
    });

//pagination
app.get('/paginate/:limit', (req, res) => {
        feed.findAndCountAll({   
        limit: parseInt(req.params.limit),
        offset: 0,
        }).then(function (result) {
        console.log(result.count)
        res.status(200).send({count:result.count})
        }).catch(err => {
            console.error('Unable to paginate:', err);
        });
    });
// add new feed
app.post('/addnew', (req, res) => {
    feed.create({ name: "Jane", image: "Doe.jpg" ,description :"test",dateLastEdited:"2019/09/02" }).then(jane => {
        console.log("Jane's auto-generated ID:", jane.id);
        res.status(200).send(jane)
    });
});
  
// delete  feed
app.delete('/deleteFeed/:name', (req, res) => {

    if (!req.params || !req.params.name) {        
        return res.status(400).send({ message: 'Invalid input' });
    }

    if (typeof req.params.name !== 'string') { 
        console.log(typeof req.params.id)       
        return res.status(400).send({ message: 'not a string' });
    }

    feed.destroy({
        where: {
        name: req.params.name
        }
    }).then(() => {
        console.log("deleted");
        res.status(200).send({message:"deleted"})
    });
});
//update feed

app.put('/update/:id', (req, res) => {   

  feed.update({ name: "Doe" }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    console.log("updated");
    res.status(200).send({message:"updated"})
  });
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))