import db from '../../../libs/db';

export default async function handler(req, res){

    if(req.method !== 'POST')
    return res.status(405).end();

    const{title, content}=req.body;

    const create = await db('posts').insert({
        title,
        content
    });
    
    const createdData = await db('posts').where('id', create).first();

    res.status(200);
    res.json({
        message: 'post created succesfully',
        data: createdData
    });
}