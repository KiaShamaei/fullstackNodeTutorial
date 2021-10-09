const {verify} = require("jsonwebtoken") ;



const validToken= (req ,res , next)=>{
	const accessToken = req.header("accessToken") ;
	if(!accessToken)return res.json("you are not login");
	try {

		//string in ssecound arg must be same in where sign define .
		const validToken = verify(accessToken , "secret");
		req.user = validToken; 
		if(validToken) { 
			return next()
		}
	} catch (error) {
		return res.json({error })
	}

}
module.exports = { validToken };