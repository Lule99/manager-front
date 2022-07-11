import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { xmlToObject } from '../../helpers/XmlToJsConverter'
import { search } from '../../services/searchService'
import './search.css'

const Search = () => {

    const [SearchValue, setSearchValue] = useState("")
    const [documents, setDocuments] = useState([])

    const obradi = (data) => {
        const obj = xmlToObject(data)
        var docs = []
        for(let i in obj)
            if(obj[i] && obj[i].length && obj[i][0])
            {
            obj[i][0]['DOCUMENTID'].forEach(id => {
                docs.push({'ID':id, 'TIPDOKUMENTA':i})
            });
            }
        console.log(docs)
        setDocuments(docs)
    }

    const pretraga = () => {
        search(SearchValue).then(res => {
                obradi(res.data)
        }).catch(err => {
        })
    }

    const pregledaj = (id, type) => {
        const link = document.createElement("a");
        link.href = `http://localhost:8082/api/${type.toLowerCase()}/html/${id}`;
        link.target = "_blank";
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const skini = (id, type) => {
        const link = document.createElement("a");
        link.href = `http://localhost:8082/api/${type.toLowerCase()}/pdf/${id}`;
        link.target = "_blank";
        link.click();
        URL.revokeObjectURL(link.href);
    };


    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div>
                            <div className="padding-search">
                                <h1>Pretraga Dokumenata</h1>
                                <div className="form-group">
                                    <label>
                                        <strong>Sadržaj</strong>
                                    </label>
                                    <div className='row myrow-search'>
                                        <input
                                            type="text"
                                            class="form-control shrink"
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                        <button className="btn btn-primary btn-shrink" onClick={() => pretraga()}>
                                            Pretraga
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table
                                    id="dataTable1"
                                    className="display table text-black dataTablesCard customer-list-tbl card-table  dataTable   mb-4 table-responsive-lg "
                                >
                                    <thead>
                                        <tr className="bg-primary">
                                            <th>
                                                <strong className="font-w600 wspace-no">ID</strong>
                                            </th>
                                            <th>
                                                <strong className="font-w600 wspace-no">
                                                    Tip dokumenta
                                                </strong>
                                            </th>
                                            <th>
                                                <strong className="font-w600 wspace-no">Kreiran</strong>
                                            </th>
                                            <th className="bg-none"></th>
                                            <th className="bg-none"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.map((doc) => {
                                            return (
                                                <tr>
                                                    <td>{doc.ID}</td>
                                                    <td>{doc.TIPDOKUMENTA}</td>
                                                    <td>
                                                        <button
                                                            class="btn btn-outline-primary"
                                                            onClick={() =>
                                                                pregledaj(doc.ID, doc.TIPDOKUMENTA)
                                                            }
                                                        >
                                                            Pregledaj
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            class="btn btn-outline-primary"
                                                            onClick={() =>
                                                                skini(doc.ID, doc.TIPDOKUMENTA)
                                                            }
                                                        >
                                                            Skini
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search