import { useEffect, useState } from "react";
import {
  dokumentaZaZahtev,
  noviZahtevi,
  odbijZahtev,
  prihvatiZahtev,
} from "../../services/ZahtevService";
import { xmlToObject } from "../../helpers/XmlToJsConverter";

import "./Requests.css";
import { toast } from "react-toastify";

export const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    noviZahtevi().then((res) => {
      if (xmlToObject(res.data)) setRequests(xmlToObject(res.data).DOKUMENT);
    });
  }, []);

  const pregledaj = (id, type) => {
    const link = document.createElement("a");
    if (type == "SERTIFIKAT")
      link.href = `http://localhost:8081/api/${type.toLowerCase()}/html/${id}`;
    else
      link.href = `http://localhost:8082/api/${type.toLowerCase()}/html/${id}`;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const skini = (id, type) => {
    const link = document.createElement("a");
    if (type == "SERTIFIKAT")
      link.href = `http://localhost:8081/api/${type.toLowerCase()}/pdf/${id}`;
    else
      link.href = `http://localhost:8082/api/${type.toLowerCase()}/pdf/${id}`;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const pregledajDokumenta = (id) => {
    dokumentaZaZahtev(id).then((res) => {
      if (xmlToObject(res.data)) setDocuments(xmlToObject(res.data).DOKUMENT);
    });
  };

  const prihvati = (id) => {
    prihvatiZahtev(id)
      .then((res) => {
        let newReq = requests;
        newReq = newReq.filter((req) => req.ID[0] != id);
        setRequests([...newReq]);
        setDocuments([]);
        toast.success("Zahtev prihvacen!");
      })
      .catch((err) => {
        let newReq = requests;
        newReq = newReq.filter((req) => req.ID[0] != id);
        console.log(newReq);
        setRequests([...newReq]);
        setDocuments([]);
        toast.success("Zahtev prihvacen!");
      });
  };

  const odbij = (id) => {
    const razlog = prompt("Unesite razlog", "");
    odbijZahtev(id, razlog)
      .then(() => {
        let newReq = requests;
        newReq = newReq.filter((req) => req.ID[0] != id);
        console.log(newReq);
        setRequests([...newReq]);
        setDocuments([]);
        toast.success("Zahtev odbijen!");
      })
      .catch(() => {
        let newReq = requests;
        newReq = newReq.filter((req) => req.ID[0] != id);
        console.log(newReq);
        setRequests([...newReq]);
        setDocuments([]);
        toast.success("Zahtev odbijen!");
      });
  };

  return requests.length !== 0 ? (
    <div className="row">
      <div className="col leva-tabela tabela">
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
                <strong className="font-w600 wspace-no">Tip</strong>
              </th>
              <th>
                <strong className="font-w600 wspace-no">Kreiran</strong>
              </th>
              <th className="bg-none"></th>
              <th className="bg-none"></th>
              <th className="bg-none"></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((doc, id) => {
              return (
                <tr>
                  <td>#{id}</td>
                  <td>{doc.TIPDOKUMENTA}</td>
                  <td>{doc.KREIRAN}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => pregledajDokumenta(doc.ID)}
                    >
                      Dokumenta
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => prihvati(doc.ID)}
                    >
                      Prihvati
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => odbij(doc.ID)}
                    >
                      Odbij
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col tabela">
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
            {documents.map((doc) => {
              return (
                <tr>
                  <td>{doc.ID}</td>
                  <td>{doc.TIPDOKUMENTA}</td>
                  <td>{doc.KREIRAN}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => pregledaj(doc.ID[0], doc.TIPDOKUMENTA[0])}
                    >
                      Pregledaj
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
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
    </div>
  ) : (
    <h1>Nema novih zahteva</h1>
  );
};

export default Requests;
