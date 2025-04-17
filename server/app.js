const express = require("express");
const app = express();
const cors = require('cors');
const QRCode = require('qrcode')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const csvtojson = require('csvtojson');

app.use(cors());

// a function used to generate QR code according to user 
const generateQRCodes = async (students) => {
  const result = [];
  try {
    for (let x = 0; x < students.length; x++) {

      const qr = await QRCode.toDataURL(JSON.stringify(students[x]));
      result.push({ ...students[x], qrCode: qr });
    }
  }
  catch (e) {
    console.error('QR generation error for:', students, e);
    result.push({ students, qr: null, error: 'QR generation ' });
  }
  return result;
}

app.get('/students', async (req, res) => {
  try {
    console.log('Reading CSV...');
    const data = await csvtojson().fromFile("../indian_students_data2.csv");
    console.log('Reading CSV Completed...');
    console.log('Generating QR Codes...');
    const qrList = await generateQRCodes(data);
    console.log('QR Codes of all User generated Successfully...');
    res.json(qrList);
  } catch (error) {
    res.status(500).send('Error processing CSV');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});