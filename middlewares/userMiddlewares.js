
// Middleware to check the email is valid or not
const validEmail = (req,res,next)=>{
    const {email} = req.body;
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            error: {
                message: 'Invalid email format.',
                details: 'Email is required and must be in a valid format.',
            },
        });
    }
    next();
};

// middleware to check the data validity
const validData = (req,res,next)=>{
    const {name,email,comment,...otherFields}=req.body;
    if(Object.keys(otherFields).length > 0 ){
        return res.status(400).json({
            success: false,
            statusCode: 400,
            error: {
                message: 'Please remove the extra fields',
            },
        });
    }
    if (!name || !email || !comment) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            error: {
                message: 'Missing required fields.',
                details: 'Name, email, and comment are required.',
            },   
        });
    }
    if (typeof name !== 'string') {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            error: {
                message: 'Invalid name.',
                details: 'Name is required and must be a string.',
            },
        });
    }
    next();
}



module.exports={validEmail,validData};