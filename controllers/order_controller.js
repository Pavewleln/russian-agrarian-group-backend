import OrderModel from "../models/order.js";

export const getAll = async (req, res) => {
    const {tabID} = req.query;
    try {
        const orders = await OrderModel.find({tabID});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить записи",
            error
        });
    }
};

export const create = async (req, res) => {
    try {
        const {
            dateReceived,
            manager,
            organization,
            loadingAddress,
            unloadingAddress,
            loadingDate,
            unloadingDate,
            sender,
            recipient,
            cargo,
            transport,
            driver,
            vehicleNumber,
            freightCost,
            documentReceivedDate,
            tabID
        } = req.body;

        const { status } = req.query;

        const orderData = {
            dateReceived,
            manager,
            organization,
            loadingAddress,
            unloadingAddress,
            loadingDate,
            unloadingDate,
            sender,
            recipient,
            cargo,
            tabID,
            status: true,
        };

        if (status === "true") {
            orderData.transport = transport;
            orderData.driver = driver;
            orderData.vehicleNumber = vehicleNumber;
            orderData.freightCost = freightCost;
            orderData.documentReceivedDate = documentReceivedDate;
        }

        const order = await new OrderModel(orderData);
        await order.save();
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить запись",
            error,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: "Запись не найдена",
            });
        }
        // Инвертируем значение поля `status`
        order.status = !order.status;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Не удалось изменить запись"
        })
    }
}