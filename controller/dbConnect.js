import { connect } from "mongoose";
import config from 'config';

const db = config.get('MONGOURI')
const options = { useUnifiedTopology: true, useNewUrlParser: true }

export default connect(db, options)
    .then(() => {
      console.log(`Database connect to the app 🌵 🌵`);
    })
    .catch((err) => {
      console.log(err);
    })