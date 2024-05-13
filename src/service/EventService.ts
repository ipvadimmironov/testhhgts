

type EventStatus = "Низкая" | "Высокая" | "Критическая";

export interface Event {
    id: number;
    date: string;
    eventStatus: EventStatus;
    equipment: string | null;
    message: string;
    responsiblePerson: Person;
    isSeen: boolean
}

export interface Person {
    id: number,
    name: string,
    avatarPath: string
}


export const Persons: Person[] = [
    { id: 1, name: "Смирнов В.А.", avatarPath: "150 (3).jpg" },
    { id: 2, name: "Капустин С.С.", avatarPath: "150 (2).jpg" },
    { id: 3, name: "Ветрова И.С.", avatarPath: "150 (1).jpg" },
    { id: 4, name: "Ольшанская Е.Г.", avatarPath: "150.jpg" },
    { id: 5, name: "Лавочкин А.В.", avatarPath: "150 (5).jpg" },
]


export const equipmentStock: string[] = [
    "Вегас",
    "Коммутатор",
    "Люк",
    "ИБП",
    "Трансформатор",
    "ЛВС",

]


const data: Event[] = [
    {

        id: 1,
        date: "10.12.2022 10:00:14",
        eventStatus: "Высокая",
        equipment: equipmentStock[0],
        message: "Сервер Vegas недоступен",
        responsiblePerson: Persons[0],
        isSeen: false
    },
    {

        id: 2,
        date: "10.12.2022 10:00:14",
        eventStatus: "Низкая",
        equipment: equipmentStock[1],
        message: "Потеряно сетевое соединение",
        responsiblePerson: Persons[1],
        isSeen: true
    },
    {

        id: 3,
        date: "10.12.2022 10:00:14",
        eventStatus: "Низкая",
        equipment: equipmentStock[2],
        message: "Открыта крышка",
        responsiblePerson: Persons[2],
        isSeen: true
    },
    {

        id: 4,
        date: "10.12.2022 10:00:14",
        eventStatus: "Высокая",
        equipment: equipmentStock[3],
        message: "Низкий заряд батареии",
        responsiblePerson: Persons[3],
        isSeen: false
    },
    {

        id: 5,
        date: "10.12.2022 10:00:14",
        eventStatus: "Критическая",
        equipment: equipmentStock[4],
        message: "Недостаточное количество масла",
        responsiblePerson: Persons[4],
        isSeen: true
    },
    {

        id: 6,
        date: "10.12.2022 10:00:14",
        eventStatus: "Критическая",
        equipment: equipmentStock[4],
        message: "Обрыв силового кабеля",
        responsiblePerson: Persons[4],
        isSeen: true
    },
    {

        id: 7,
        date: "10.12.2022 10:00:14",
        eventStatus: "Высокая",
        equipment: null,
        message: "Отсутсвует подтверждение пуска в работу",
        responsiblePerson: Persons[0],
        isSeen: false
    },
    {

        id: 8,
        date: "10.12.2022 10:00:14",
        eventStatus: "Высокая",
        equipment: equipmentStock[0],
        message: "Сервер Vegas недоступен",
        responsiblePerson: Persons[0],
        isSeen: false
    },
    {

        id: 9,
        date: "10.12.2022 10:00:14",
        eventStatus: "Высокая",
        equipment: equipmentStock[0],
        message: "Сервер Vegas недоступен",
        responsiblePerson: Persons[0],
        isSeen: false
    },
    {

        id: 10,
        date: "10.12.2022 10:00:14",
        eventStatus: "Высокая",
        equipment: equipmentStock[0],
        message: "Сервер Vegas недоступен",
        responsiblePerson: Persons[0],
        isSeen: false
    },


]



export const ProductService = {
    async getProducts(filter: string) {
        return data.filter(el => el.message.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }
}


//export { ProductService :  } new ProductService();