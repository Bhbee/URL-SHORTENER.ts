require("dotenv").config();
import express from 'express';
import { nanoid } from 'nanoid';
import cors from 'cors';
import axios from 'axios';
import validUrl from 'valid-url';
import { verifyUser } from './middleware/verifyUser';
import { Login, Register } from './controller/auth.controller';
import dbConnect from './config/dbConfig';
import { UrlMapping, UrlMappingModel } from './model/urlModel';

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use(
    cors({
     credentials: true,
     origin: ["http://localhost/3000"] //edit to frontend address
 }));

const QR_CODE_API_KEY = 'YOUR_QR_CODE_API_KEY';

app.post('register', Register);
app.post('/sign-in', Login);

app.get('/', async (req, res) => {
  const shortUrls = await UrlMappingModel.find({ user: req.user.sub });
  res.render('index', { shortUrls: shortUrls });
});

app.post('/shorten', verifyUser, async (req, res) => {
  const { longUrl, customUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: 'Please provide a long URL' });
  }
  if (!validUrl.isWebUri(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const existingMapping = await UrlMappingModel.findOne({ longUrl: req.body.longUrl });
  if (existingMapping) {
    return res.json({ shortUrl: existingMapping.shortUrl });
  }
  let shortUrl;
  if (customUrl) {
    const customUrlExist = await UrlMappingModel.findOne({ shortUrl: customUrl });
    if (customUrlExist) {
      return res.status(409).json({ error: 'Custom URL already taken' });
    }
    shortUrl = customUrl;
  } else {
    shortUrl = generateShortUrl();
  }

  const qrCodeUrl = await generateQrCode(longUrl);

  const newUrlMapping = await UrlMappingModel.create({
    longUrl: longUrl,
    shortUrl: shortUrl,
    qrCodeUrl: qrCodeUrl,
  });
  //res.redirect('/')
  res.json({ newUrlMapping });
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await UrlMappingModel.findOne({ shortUrl: req.params.shortUrl });
  if (!shortUrl || shortUrl == null) {
    return res.status(404).json({ error: 'URL not found' });
  }
  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.longUrl);
});

async function generateQrCode(url: string): Promise<string> {
  const apiEndpoint = `https://api.qrcode-generator.com/v1/create/?access-token=${QR_CODE_API_KEY}`;

  try {
    const response = await axios.post(apiEndpoint, { data: { type: 'url', content: url } });
    const { image } = response.data;
    return image;
  } catch (error) {
    console.error('Failed to generate QR code', error);
    return '';
  }
}

function generateShortUrl(): string {
  return nanoid(8);
}

dbConnect();
//run server and connect to database
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
