const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel');

// @desc ger all contact details
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
})

// @desc create new contact
// @route post /api/contacts
// @access private
const addContact = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(! name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    })
    res.status(200).json(contact);
})

// @desc get the contact details
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (contact == null){
        res.status(404);
        throw new Error("Contact not found !");
    }
    res.status(200).json(contact);
})

// @desc delete the contact details
// @route GET /api/contacts/:id
// @access private
const delContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (contact == null){
        res.status(404);
        throw new Error("Contact not found !");
    }
    await contact.deleteOne();
    res.status(200).json(contact);
})

// @desc update the contact details
// @route GET /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (contact == null){
        res.status(404);
        throw new Error("Contact not found !");
    }
    if(contact.user_id.toString() !== req.user.id){
        
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,
        req.body,
        {new : true},
        );
    res.status(200).json(updatedContact);
})

module.exports = {getContact, addContact, getContacts, delContact, updateContact};