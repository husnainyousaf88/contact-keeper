const express = require('express');
const router = express.Router();

//@route    GET api/contacts
//@desc     Get all user contacts
//@access   private 
router.get('/', (req, res)=> {
    res.send('Get all contacts');
});


//@route    POST api/contacts
//@desc     Add new contact
//@access   private 
router.post('/', (req, res)=> {
    res.send('Add a contact');
});

//@route    PUT api/contacts/:id
//@desc     Update Contact
//@access   private 
router.put('/', (req, res)=> {
    res.send('update contact');
});


//@route    DELETE api/contacts/:id
//@desc     Delete Contact
//@access   private 
router.delete('/', (req, res)=> {
    res.send('delete contact');
});


module.exports = router;