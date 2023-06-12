import DriverModel from "../models/driver.js";
export const getAll = async (req, res) => {
    try {
        const drivers = await DriverModel.find();
        res.json(drivers);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить список водителей",
            error
        });
    }
};