import {Request, Response } from "express";
import { WorkerModel } from "../../src/database/models/worker.model";


export const searchController = async (req:Request, res:Response) =>{
    const {value} = req.body;

    if (!value) {
        res.status(200).send({foundWorkers:[]});
        return;
    }

    const foundWorkers = await WorkerModel.find({
        jobName:{$regex: value, $options: "i"},
    });
    res.status(200).send({foundWorkers})
}