import dbConnect from '../../utils/dbconnect'
import FundProject from '../../models/FundProject'
import { cloudinary } from '../../utils/cloudinary'

dbConnect()

export default async function Handler(req, res){
    let result
    const {method, query: address} = req;
console.log(address);
    switch (method){

        case 'GET':
            try {
                console.log("Getting projects of that specific account");
                const project = await FundProject.find(address)
                res.status(200).json({success: true, data: project})
                result = project
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
                    const project = await FundProject.findById(id)
                    console.log("project is");

                    console.log(project);
                    
                    const imgId = project.public_id;
                    console.log("Image id is");
                    console.log(imgId);

                    if (imgId) {
                        await cloudinary.uploader.destroy(imgId);
                    }

                    const deletedProject = await FundProject.deleteOne({id_: id})
                    
                    //If that note doesnt exist
                    if (!deletedProject){
                        res.status(400).json({success: false})
                    }
                    //Send an empty data in the response 
                    res.status(201).json({success: true, data: {}})
                } catch (error) {
                    res.status(400).json({success: false})
                }
            default:
                res.status(400).json({success: false})
                console.log('Default error');
    } 
 return result
}