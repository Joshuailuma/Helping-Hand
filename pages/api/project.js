import dbConnect from '../../utils/dbconnect'
import FundProject from '../../models/FundProject'


dbConnect()

export default async (req, res) =>{
    let result
    const {method} = req;
console.log(method);
    switch (method){

        case 'GET':
            try {
                console.log("Getting details");
                const project = await FundProject.find({})
                res.status(200).json({success: true, data: project})
                result = project
                // console.log(result);
            } catch (error) {
                res.status(400).json({success: false})
                result = "Error getting projects"
                // console.log(error);
                
            }
            break;
            case 'POST':
            try {
                const project = await FundProject.create(req.body)
                res.status(201).json({success: true, data: project})
                console.log("Posting successful")
                result = project
            } catch (error) {
                res.status(400).json({success: false})
                result = "Error posting a project"
                console.log('Error posting a project');
                console.log(error);
            }
            break;
            default:
                res.status(400).json({success: false})
                console.log('Default error');
    } 
 return result
}