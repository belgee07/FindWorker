import { CardModel } from "../../src/database/models/card.model"; 

export const getCard = async (req: any, res: any) => {
    const { authId } = req.params
    console.log(req.params);
    
    const userCard = await CardModel.findOne({ authId })

    if(!userCard){
        res.status(200).send("No User Card Found")
        return
    }

    res.status(200).send(userCard)
}