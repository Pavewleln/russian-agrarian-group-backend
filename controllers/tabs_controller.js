import TabModel from "../models/tab.js";

export const getAll = async (req, res) => {
    try {
        const tabs = await TabModel.find();
        res.status(200).json(tabs)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить вкладки",
            error
        });
    }
}

export const create = async (req, res) => {
    try {
        const {
            title
        } = req.body
        const existingTab = await TabModel.findOne({ title });
        if (existingTab) {
            return res.status(400).json({
                message: "Вкладка с таким названием уже существует",
            });
        }
        const tab = await new TabModel({
            title
        })
        await tab.save()
        res.json(tab)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить вкладку",
            error
        });
    }
}

export const remove = async (req, res) => {
    try {
        TabModel.findByIdAndDelete({
            _id: req.params.id
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Не удалось удалить вкладку"
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Вкладка не найдена"
                })
            }
            res.json({
                success: true
            })
        })
    } catch (err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: "Не удалось удалить вкладку"
            })
        }
    }
}