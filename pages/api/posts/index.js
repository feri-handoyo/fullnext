import db from '../../../libs/db';
import jwt from 'jsonwebtoken';
export default async function handler(req, res){
    if(req.method !== 'GET') return res.status(405).end();
    
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).end();

    const authSplit = authorization.split(' ');
    
    const [authType, authToken]=[
        authSplit[0],
        authSplit[1]
    ]
    if (authType!=='bearer') return res.status(401).end();
    try {
        const verify = jwt.verify(authToken, 'akuganteng');
        console.log(verify);


        const posts = await db('posts');

        res.status(200);
        res.json({
            message: 'posts data',
            data: posts
        });
    }catch(err){
        res.status(401).end();
    }
}