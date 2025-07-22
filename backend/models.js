// models.js
const mongoose = require('mongoose');
//const { use } = require('./routes');

// Define Schema for Inventory Collection
const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});
const Inventory = mongoose.model('Inventory', inventorySchema, 'inventory');

// Define Schema for MyData Collection
const myDataSchema = new mongoose.Schema({
    item: String,
    qty: Number,
    status: String
});
const MyData = mongoose.model('MyData', myDataSchema, 'mydata');

const classVideoSchema = new mongoose.Schema({
    type: String,
    subject: String,
    topic: String,
    name: String,
    img: String,
    link: String,
});
const ClassVideo = mongoose.model('ClassVideo', classVideoSchema, 'classvideo');


// Define Schema for Products Collection
const productsSchema = new mongoose.Schema({
    item: String,
    qty: Number,
    image: String,
    size: {
        h: Number,
        w: Number,
        uom: String
    }
});
const Products = mongoose.model('Products', productsSchema, 'products');

// Define Schema for Products Collection
const studentSchema = new mongoose.Schema({
    name: String,
    roll: Number,
    section: String,
    stream: String,
    college: String
});
const Student = mongoose.model('Student', studentSchema, 'student');

// Define Schema for Login Collection
const LoginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: Number
});
const Login = mongoose.model('Login', LoginSchema, 'login');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model("User", userSchema);

/*
const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdfPath: { type: String, required: true }, // Path to the uploaded PDF
});

const PdfModel = mongoose.model('Pdf', pdfSchema);

*/

/*
const pdfSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    pdfPath: { type: String, required: true }, 
  });
  */

const pdfSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Title of the PDF
    type: { type: String, required: true }, // Title of the PDF
    subject: { type: String, required: true }, // Description of the PDF
    pdfPath: { type: String, required: true }, // Path to the PDF file
});

// Create the Pdf model
const Pdf = mongoose.model("Pdf", pdfSchema);

const bookpdfSchema = new mongoose.Schema({
    book: { type: String, required: true }, // Title of the PDF
    name: { type: String, required: true }, // Title of the PDF
    type: { type: String, required: true }, // Title of the PDF
    subject: { type: String, required: true }, // Description of the PDF
    pdfPath: { type: String, required: true }, // Path to the PDF file
});

// Create the Pdf model
const BookPdf = mongoose.model("BookPdf", bookpdfSchema);

module.exports = { Inventory, MyData, ClassVideo, Products, Student, Login, User, Pdf, BookPdf };