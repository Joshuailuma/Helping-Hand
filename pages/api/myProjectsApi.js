import dbConnect from '../../utils/dbconnect'
import FundProject from '../../models/FundProject'
var cloudinary = require('cloudinary');
//This config set up is important
cloudinary.config({ 
    cloud_name:  process.env.cloud_name,
  api_key:  process.env.api_key,
  api_secret: process.env.api_secret,
  });

dbConnect()

export default async function Handler(req, res){
    let result
    const {method, query: address} = req;
console.log(req.query.public_id);
    switch (method){

        case 'GET':
            try {
                console.log("Getting projects of that specific account");
                const project = await FundProject.find(address)
                res.status(200).json({success: true, data: project})
                result = project
                console.log("Result from get request");

                return;
                //FIX THIS ACCOUNT THING
            } catch(error) {
                console.log("Sending error");
                res.status(400).json({success: false})
                result = "Error getting projects"
                console.log(error);
                
            }
            break;
            case 'POST':
            try {
                const project = await FundProject.create(req.body)
                res.status(201).json({success: true, data: project})
                console.log("Posting successful")
                result = project
                return;
            } catch (error) {
                res.status(400).json({success: false})
                result = "Error posting a project"
                console.log('Error posting a project');
                console.log(error);
            }
            break;

            case 'DELETE':
                try {
                    //Get query parameter anad delete from cloudinary
                    // according to the query parameter public_id
                    if(req.query.public_id !== "undefined"){
                        console.log("Deleting from cloudinary");

                        let result
                       await cloudinary.v2.uploader.destroy(req.query.public_id)
                       .then(r=>result=r);;
                        console.log("Deleted from cloudinary");
                        console.log(result);
                        if ({result} == "ok"){
                            console.log("Hehe");
                            // res.status(201).json({success: true, message: "Deleted successfully"})
                        } else{
                            console.log("Else");
                            result = "Error deleting"
                            // res.status(400).json({success: false, message: 'Error deleting'})

                        }
                    }

                   if(req.query.id !== "undefined"){
                    console.log("Deleting from mongo");

                    await FundProject.deleteOne({id_: req.query.id})
                    console.log("SUCCESSFULLY DELETED PROJECT");
                    result = "Successfully deleted project"
                    // Try not to send many res.status
                    res.status(201).json({success: true, message: 'Project deleted'})
                  
                    return;
                   }

                } catch (error) {
                    console.log("catch error");
                    console.log(error);
                    res.status(400).json({success: false, message: "Something wen wrong"})
                }
                break;
            default:
                res.status(400).json({success: false})
                console.log('Default error');
    } 
 return result
}