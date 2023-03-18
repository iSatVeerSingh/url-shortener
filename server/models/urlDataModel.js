import mongoose from 'mongoose';
import shortid from 'shortid';

const UrlSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
    index: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    default: shortid.generate,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: {
      expireAfterSeconds: 0,
    },
  },
});

const ShortUrlModel = mongoose.model('shorturl', UrlSchema);

export default ShortUrlModel;
