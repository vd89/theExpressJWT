
import {AES,enc} from 'crypto-js';
import config from 'config';
import { verify } from 'jsonwebtoken';


export default async function auth(req,res,next) {
  const token = req.header('x-auth-user')
  console.log({token: token});
  if (!token) {
    res.json({msg: 'Access Denied'})
  }
  try {
    const cryptoKey = config.get('CryptuSecretKey')
    const byte = await AES.decrypt(token,cryptoKey)
    const origToken = await byte.toString(enc.Utf8)
    console.log(origToken);
    const secretKey = config.get('JWTSecretKey')
    const decoded = await verify(origToken,secretKey)
    req.user = decoded
    next()
  } catch (error) {
    res.json({msg:'Token Expired. Login Again'})
  }
};
