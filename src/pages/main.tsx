
import { useState, useEffect } from 'react';
import { Persons, ProductService, equipmentStock } from '../service/EventService';
// import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
//import { classNames } from 'primereact/utils';
import { Event } from '../service/EventService';

import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import { useKey } from 'react-keyboard-hooks';
import { produce } from 'immer';
import { Button } from 'primereact/button';
import moment from 'moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


// interface Product {
//     id: string;
//     code: string;
//     name: string;
//     description: string;
//     image: string;
//     price: number;
//     category: string;
//     quantity: number;
//     inventoryStatus: string;
//     rating: number;
// }


type LayoutType = "grid" | "list";

export default function TestHH() {
    const [events, setEvents] = useState<Event[]>([]);
    const [layout, setLayout] = useState<LayoutType>('grid');
    const [selectedId, setSelectedId] = useState<Event["id"] | null>(null);
    const [filter, setFilter] = useState("");



    useEffect(() => {
        ProductService.getProducts(filter).then((data) => setEvents(data.slice(0, 12)));
    }, [filter]);


    useKey(' ', () => {
        if (selectedId) {
            setEvents(produce(draft => {
                const event = draft.find(evt => evt.id == selectedId) as Event;
                event.isSeen = !event.isSeen;
            }))
        }
    })


    const getSeverity = (product: Event) => {
        switch (product.eventStatus) {
            case 'Низкая':
                return 'info';

            case 'Высокая':
                return 'warning';

            case 'Критическая':
                return 'danger';

            default:
                return null;
        }
    };

    // const listItem = (event: Event) => {
    //     const index: number = 10;
    //     return (
    //         <div className="col-12" key={event.id}>
    //             <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
    //                 <div className="flex flex-row sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
    //                     <div className="flex flex-row align-items-center sm:align-items-start gap-3">
    //                         <div className="text-2xl font-bold text-900">{event.message}</div>
    //                         {/* <Rating value={event.rating} readOnly cancel={false}></Rating> */}
    //                         <div className="flex align-items-center gap-3">
    //                             <span className="flex align-items-center gap-2">
    //                                 <i className="pi pi-tag"></i>
    //                                 <span className="font-semibold">{event.equipment}</span>
    //                             </span>
    //                             <Tag value={event.eventStatus} severity={getSeverity(event)}></Tag>
    //                         </div>
    //                     </div>
    //                     <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
    //                         <span className="text-2xl font-semibold">{event.responsiblePerson.name}</span>
    //                         {/* <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={event.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    const gridItem = (event: Event) => {
        return (
            <div onClick={() => setSelectedId(event.id)} className={`col-12 sm:col-12 lg:col-12 xl:col-4 p-2 ${event.isSeen ? "opacity-50" : ""}  `} key={event.id}>
                <div className={`p-2 border-2 hover:border-cyan-700 border-round surface-200  ${event.id == selectedId ? "border-primary" : "border-transparent"}`} >


                    <div className="grid nested-grid text-sm  font-bold ">
                        <div className="col-8">
                            <div className="grid">
                                <div className="col-6">
                                    <div className="text-left p-2 border-round-sm surface-100 font-bold">Дата</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-left p-2 border-round-sm bg-primary-reverse">{event.date}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-left p-2 border-round-sm surface-100  font-bold">Важность</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-left p-0 border-round-sm"><Tag value={event.eventStatus} severity={getSeverity(event)}></Tag></div>
                                </div>
                                <div className="col-6">
                                    <div className="text-left p-2 border-round-sm surface-100  font-bold">Оборудование</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-left p-2 border-round-sm bg-primary-reverse ">{event.equipment}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="text-center p-2 border-round-sm h-full  flex flex-column justify-content-around align-items-center">
                                <img className="w-4 shadow-2  h-auto border-circle" src={`./${event.responsiblePerson.avatarPath}`} alt={event.responsiblePerson.name} />
                                <div className='white-space-nowrap' >{event.responsiblePerson.name}</div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="grid">
                                <div className="col-4">
                                    <div className="text-left p-2 border-round-sm h-full surface-100  font-bold">Сообщение</div>
                                </div>
                                <div className="col-8">
                                    <div className="text-left p-2 border-round-sm h-full bg-primary-reverse font-bold">{event.message}</div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div >
        );
    };

    // const itemTemplate = (product: Event, layout: LayoutType): ReactNode => {
    //     if (!product) {
    //         return;
    //     }

    //     if (layout === 'list') return listItem(product);
    //     else if (layout === 'grid') return gridItem(product);
    // };


    const addEvent = () => {

        setTimeout(() => {
            setEvents(events => [{
                id: (events.at(-1)?.id || 0) + 1,
                date: moment().format("DD.MM.YYYY HH:mm:ss"),
                eventStatus: getRandom(["Высокая", "Критическая", "Низкая"]),
                equipment: getRandom(equipmentStock),
                message: "Текст события",
                responsiblePerson: getRandom(Persons),
                isSeen: false
            }, ...events]);
        }, 500)


    }


    const header = () => {
        return (
            <div className="flex flex-wrap gap-3 p-4 justify-content-between" >


                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value as LayoutType)} />


                <Button onClick={addEvent} className="p-button-rounded">Добавить событие</Button>

                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={filter} onChange={(e) => setFilter(e.currentTarget.value)} placeholder="" className='max-w-13rem' />
                </IconField>
            </div>
        );
    };

    const statusTemplate = (rowData: Event) => {
        return <Tag value={rowData.eventStatus} severity={getSeverity(rowData)} />;
    };


    const rowClass = (data: Event) => {
        return {
            'opacity-50': data.isSeen
        };
    };



    return (
        <div className="card" style={{ minWidth: "300px" }}>

            {layout == "grid"
                ? <DataView value={events} itemTemplate={gridItem} layout={layout} header={header()} paginator rows={6} />
                :
                <DataTable
                    selectionMode="single"
                    selection={events.find(ev => ev.id == selectedId)}
                    onSelectionChange={(e) => setSelectedId(e.value.id)}
                    dataKey="id"
                    value={events}
                    tableStyle={{ minWidth: '50rem' }}
                    header={header()}
                    paginator
                    rowClassName={rowClass}
                    rows={6}>
                    <Column field="date" header="Дата"></Column>
                    <Column header="Важность" body={statusTemplate}></Column>
                    <Column field="equipment" header="Оборудование"></Column>
                    <Column field="message" header="Сообщение"></Column>
                    <Column field="responsiblePerson.name" header="Ответственный"></Column>
                </DataTable>
            }
        </div>
    )
}



function getRandom<T>(array: T[]): T {

    return array[Math.round((array.length - 1) * Math.random())];

}