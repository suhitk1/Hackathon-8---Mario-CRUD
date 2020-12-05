const User = require('../models/marioChar.js');
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
User.find()
  .then(users => {
  res.send(users);
});
};
// Create and Save a new User
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({message: 'either name or weight is missing'});
}
// Create a new User
const user = new User({
  name: req.body.name,
  weight: req.body.weight
});
// Save user in the database
user.save()
  .then(data => {
  res.status(201).send(data);
});
};
// Find a single User with a id
exports.findOne = (req, res) => {
 User.findById(req.params.id)
  .then(user => {
  if(!user) {
   return res.status(400).send({
   message: error.message
 });
}
 res.send(user);
});
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
  message: error.message
});
}
// Find user and update it with the request body
User.findByIdAndUpdate(req.params.id, {
  name: req.body.name,
  weight: req.body.weight
})
.then(user => {
 if(!user) {
   return res.status(400).send({
   message: error.message
 });
}
res.send(user);
});
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
User.findByIdAndRemove(req.params.id)
.then(user => {
if(!user) {
  return res.status(400).send({
  message: error.message
});
}
res.status(200).send({message: 'character deleted'});
});
};