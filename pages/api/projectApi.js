import dbConnect from '../../utils/dbconnect'
import FundProject from '../../models/FundProject'

dbConnect()

/**
 * Handles each project api request in available project page
 * Handles the Get and post request
 * @param {*} req 
 * @param {*} res 
 * @returns result
 */
export default async function Handler(req, res){
    let result
    const {method, query: {id},} = req;
console.log(method);
    switch (method){

        case 'GET':
            try {
                console.log("Getting details");
                // Get all projects in mongdb
                const project = await FundProject.find({})
                //Send a response to the frontend. Can be sent only once
                res.status(200).json({success: true, data: project})
                //Make result to be the project gotten
                result = project
            } catch (error) {
                // Send a response when it cannot get it
                res.status(400).json({success: false})
                result = "Error getting projects"                
            }
            break;
            case 'POST':
            try {
                // Create a project in the database
                const project = await FundProject.create(req.body)
                // Send a 201 response with the project
                res.status(201).json({success: true, data: project})
                console.log("Posting successful")
                //Make result to be the response of the post
                result = project
                // Leave the function
                return;
            } catch (error) {
                // When there is an error posting the project
                res.status(400).json({success: false, message: error})
                result = "Error posting a project"
                console.log(error);
            }
            break;
            default:
                res.status(400).json({success: false})
                console.log('Default error');
    } 
 return result
}