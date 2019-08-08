const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

const config     = require('config');


//@route    GET api/contacts
//@desc     Get all user contacts
//@access   private     // this is private route because every user has different conatct list
router.get('/',auth,
    async (req, res)=> {
    try {
        const contact =  await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contact);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
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