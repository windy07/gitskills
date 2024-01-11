const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anl026861@gamil.com',
        pass: 'sWryzxC20040126'
    }
});

app.post('/send-data', (req, res) => {
    const { ip, latitude, longitude } = req.body;
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'your_email@gmail.com',
        subject: 'New Visitor Data',
        text: `IP: ${ip}, Latitude: ${latitude}, Longitude: ${longitude}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent successfully');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
