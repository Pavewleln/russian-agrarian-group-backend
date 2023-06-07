import {model, Schema} from 'mongoose'


const OrderSchema = new Schema({
    // ДАТА ПОЛУЧЕНИЯ ЗАЯВКИ
    dateReceived: {
        type: String,
        required: false
    },
    // МЕНЕДЖЕР
    manager: {
        type: String,
        required: false
    },
    // ОРГАНИЗАЦИЯ
    organization: {
        type: String,
        required: false
    },
    // ЗАГРУЗКА
    loadingAddress: {
        type: String,
        required: false
    },
    // ВЫГРУЗКА
    unloadingAddress: {
        type: String,
        required: false
    },
    // ДАТА ЗАГРУЗКИ
    loadingDate: {
        type: String,
        required: false
    },
    // ДАТА ВЫГРУЗКИ
    unloadingDate: {
        type: String,
        required: false
    },
    // ГРУЗООТПРАВИТЕЛЬ
    sender: {
        type: String,
        required: false
    },
    // ГРУЗОПОЛУЧАТЕЛЬ
    recipient: {
        type: String,
        required: false
    },
    // НОМЕНКЛАТУРА ГРУЗА
    cargo: {
        type: String,
        required: false
    },
    // ПЕРЕВОЗ
    transport: {
        type: String,
        required: false
    },
    // ВОДИТЕЛЬ
    driver: {
        type: String,
        required: false
    },
    // НОМЕР ТС
    vehicleNumber: {
        type: String,
        required: false
    },
    // СТОИМОСТЬ ФРАХТА
    freightCost: {
        type: Number,
        required: false
    },
    // ДАТА ПОЛУЧЕНИЯ ДОКУМЕНТОВ
    documentReceivedDate: {
        type: String,
        required: false
    },
    // НАЗВАНИЕ ВКЛАДКИ
    tabID: {
        type: String,
        required: false
    },
    // СТАТУС ЗАПИСИ
    status: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
})

export default model("Order", OrderSchema)