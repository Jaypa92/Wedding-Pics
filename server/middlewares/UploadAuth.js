module.exports = (req, res, next) => {
    const { uploadKey } =req.body;

    if(!uploadKey || uploadKey !== process.env.UPLOAD_KEY){
        return res.status(401).json({ error: 'Unauthorized'});
    }

    next();
}