import dbConnect from '../../utils/dbconnect'
import FundProject from '../../models/FundProject'

dbConnect()

// Was created incase i want to do something specific with ID. 
// i guess i'm already doing it with the other one
export default async (req, res) =>{
    const {
        query: {id},
        method} = req;

        switch (method){
            // WHen it is a get request with id
            case 'GET':
                try {
                    //Get from database by id
                    const project = await FundProject.findById(id)
                    // If that project is not found in the database
                    if (!project){
                        res.status(400).json({success: false})
                    }
                } catch (error) {
                    res.status(400).json({success: false})
                    
                }
                break;
                //TO edit from database
                case 'PUT':
                try {
                    const project = await FundProject.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true
                    })

                    if (!project){
                        res.status(400).json({success: false})
                    }
                    res.status(201).json({success: true, data: project})
                } catch (error) {
                    res.status(400).json({success: false})
                }
                break;

                //TO delete from the database
                 case 'DELETE':
                    try {
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
                    break;
                default:
                    res.status(400).json({success: false})
        } 
}