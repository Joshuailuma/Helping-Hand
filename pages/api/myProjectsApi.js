import dbConnect from '../../utils/dbconnect'
import FundProject from '../../models/FundProject'
var cloudinary = require('cloudinary');

//This config set up is important. It's a setup that cloudinary wants before you can delete from their database
cloudinary.config({ 
cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  });

dbConnect()

/**
 * Handles each individual project api request in my project page
 * Handles the Get and Delete request
 * @param {*} req 
 * @param {*} res 
 * @returns result
 */
export default async function Handler(req, res){
    let result //Result of a block. Either a project or error message. To be displayed in the front end
    const {method, query: address} = req;
    switch (method){
        case 'GET':
            try {
                // Get projects that have a particular address in the field
                const project = await FundProject.find(address)
                // If successful, send a succes response header.
                res.status(200).json({success: true, data: project})
                // Make result to be the project
                result = project
                return; // We want to leave the function
            } catch(error) {
                // So res.status should be used during a finished result or an error
                // It should be sent once
                res.status(400).json({success: false, message: error})
                result = "Error getting projects"                
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
                res.status(400).json({success: false, message: error})
                result = "Error posting a project"
                console.log('Error posting a project');
                console.log(error);
            }
            break;

            case 'DELETE':
                try {
                    //Get query parameter and delete from cloudinary
                    // according to the query parameter field public_id
                    // Make sure the req.query.public_id has a value
                    if(req.query.public_id !== "undefined"){
                        // console.log("Deleting from cloudinary")
                        let result
                        // Delete from cloudinary
                       await cloudinary.v2.uploader.destroy(req.query.public_id)
                       .then(r=>result=r);;
                        // console.log("Deleted from cloudinary");
                        // A result ok object is usually returned from cloudinary
                        // ..if deletion was successful
                        if ({result} == "ok"){
                            console.log("Deleted");
                        } else{
                            result = "Error deleting"
                            console.log("Error deleting");
                        }
                    }

                    // Check if id from query parameter(from front end) has a value
                   if(req.query.id !== "undefined"){
                    console.log("Deleting from mongo");
                    // Delete from mongodb according to the id
                    await FundProject.deleteOne({id_: req.query.id})
                    console.log("SUCCESSFULLY DELETED PROJECT");
                    result = "Successfully deleted project"
                    // We can now finally send a res.status if everything is succesful
                    // Try not to send many res.status
                    res.status(201).json({success: true, message: 'Project deleted'})
                    // Of course leave this function
                    return;
                   }

                } catch (error) {
                    console.log(error);
                    result = error
                    // Send this to the frontend console if there is an error
                    res.status(400).json({success: false, message: error})
                }
                break;
            default:
                res.status(400).json({success: false})
                console.log('Default error');
    } 
 return result
}