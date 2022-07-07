import { useEffect, useState } from "react";
import { noviZahtevi } from "../../services/ZahtevService";
import { xmlToObject } from "../../helpers/XmlToJsConverter";

import "./Requests.css";

export const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    noviZahtevi().then((res) => {
      if (xmlToObject(res.data)) setRequests(xmlToObject(res.data).DOKUMENT);
    });
  });

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

  return requests.length !== 0 ? (
    <div className="row">
      <div className="col leva-tabela">
        <table
          id="dataTable1"
          className="display table text-black dataTablesCard customer-list-tbl card-table  dataTable   mb-4 "
        >
          <thead>
            <tr className="bg-primary">
              <th>
                <strong className="font-w600 wspace-no">ID</strong>
              </th>
              <th>
                <strong className="font-w600 wspace-no">Tip dokumenta</strong>
              </th>
              <th>
                <strong className="font-w600 wspace-no">Kreiran</strong>
              </th>
              <th className="bg-none"></th>
              <th className="bg-none"></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((doc) => {
              return (
                <tr>
                  <td>{doc.ID}</td>
                  <td>{doc.TIPDOKUMENTA}</td>
                  <td>{doc.KREIRAN}</td>
                  <td>
                    <button
                      class="btn btn-outline-primary"
                      onClick={() => pregledaj(doc.ID[0], doc.TIPDOKUMENTA[0])}
                    >
                      Pregledaj
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-outline-primary"
                      onClick={() => skini(doc.ID[0], doc.TIPDOKUMENTA[0])}
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
      <div className="col"></div>
    </div>
  ) : (
    <h1>Nema novih zahteva</h1>
  );
};

export default Requests;
