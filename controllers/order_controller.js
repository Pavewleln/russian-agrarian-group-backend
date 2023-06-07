import OrderModel from "../models/order.js";

export const getAll = async (req, res) => {
    const { tabID } = req.query;
    try {
        const orders = await OrderModel.find({ tabID });
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
            // ДАТА ПОЛУЧЕНИЯ ЗАЯВКИ
            dateReceived,
            // МЕНЕДЖЕР
            manager,
            // ОРГАНИЗАЦИЯ
            organization,
            // ЗАГРУЗКА
            loadingAddress,
            // ВЫГРУЗКА
            unloadingAddress,
            // ДАТА ЗАГРУЗКИ
            loadingDate,
            // ДАТА ВЫГРУЗКИ
            unloadingDate,
            // ГРУЗООТПРАВИТЕЛЬ
            sender,
            // ГРУЗОПОЛУЧАТЕЛЬ
            recipient,
            // НОМЕНКЛАТУРА ГРУЗА
            cargo,
            // ПЕРЕВОЗ
            transport,
            // ВОДИТЕЛЬ
            driver,
            // НОМЕР ТС
            vehicleNumber,
            // СТОИМОСТЬ ФРАХТА
            freightCost,
            // ДАТА ПОЛУЧЕНИЯ ДОКУМЕНТОВ
            documentReceivedDate,
            // НАЗВАНИЕ ВКЛАДКИ
            tabID
        } = req.body

        const order = await new OrderModel({
            // ДАТА ПОЛУЧЕНИЯ ЗАЯВКИ
            dateReceived,
            // МЕНЕДЖЕР
            manager,
            // ОРГАНИЗАЦИЯ
            organization,
            // ЗАГРУЗКА
            loadingAddress,
            // ВЫГРУЗКА
            unloadingAddress,
            // ДАТА ЗАГРУЗКИ
            loadingDate,
            // ДАТА ВЫГРУЗКИ
            unloadingDate,
            // ГРУЗООТПРАВИТЕЛЬ
            sender,
            // ГРУЗОПОЛУЧАТЕЛЬ
            recipient,
            // НОМЕНКЛАТУРА ГРУЗА
            cargo,
            // ПЕРЕВОЗ
            transport,
            // ВОДИТЕЛЬ
            driver,
            // НОМЕР ТС
            vehicleNumber,
            // СТОИМОСТЬ ФРАХТА
            freightCost,
            // ДАТА ПОЛУЧЕНИЯ ДОКУМЕНТОВ
            documentReceivedDate,
            // НАЗВАНИЕ ВКЛАДКИ
            tabID,
            // СТАТУС ЗАПИСИ
            status: true,
        })
        await order.save()
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось добавить запись",
            error
        })
    }
}

export const remove = async (req, res) => {
    try {
        OrderModel.findByIdAndDelete({
            _id: req.params.id
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Не удалось удалить запись"
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Запись не найдена"
                })
            }
            res.json({
                success: true
            })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Не удалось удалить запись"
        })
    }
}