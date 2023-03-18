import mongoose from 'mongoose';

export default async () => {
  const { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD, DB_NAME } =
    process.env;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      user: MONGODB_USERNAME,
      pass: MONGODB_PASSWORD,
    });
    // eslint-disable-next-line no-console
    console.log('database connected successfully');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
