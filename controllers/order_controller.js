import OrderModel from "../models/order.js";

export const getAll = async (req, res) => {
    const {tabID, date} = req.query;
    try {

        // Приводим значение параметра date к формату "yyyy-mm-dd"
        const formattedDate = date ? new Date(date).toISOString().substr(0, 10) : undefined;

        let orders;
        if (tabID === "archive") {
            // Если tabID равен "archive", выбираем все записи с полем status равным false
            orders = await OrderModel.find({status: false});
        } else {
            // Иначе выбираем записи с полем status равным true и фильтруем их по полю dateReceived, если параметр date определен
            const query = {tabID, status: true};
            if (formattedDate) {
                query.dateReceived = formattedDate;
            }
            orders = await OrderModel.find(query);
        }

        res.json(orders.reverse());
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить записи",
            error
        });
    }
};

export const create = async (req, res) => {
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

    const {status} = req.query;

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

    try {
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

export const edit = async (req, res) => {
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

        const {status} = req.query;

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
        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            orderData,
            {new: true}
        );
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось изменить запись",
            error,
        });
    }
}