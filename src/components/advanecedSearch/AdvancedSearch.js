import { useState } from "react";
import { xmlToObject } from "../../helpers/XmlToJsConverter";
import { advancedSearch } from "../../services/searchService";
import "./AdvancedSearch.css";

export const AdvancedSearch = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("INTERESOVANJE");
  const [documents, setDocuments] = useState([]);

  const pretraga = () => {
    advancedSearch(type, query).then((res) => {
      if (xmlToObject(res.data)) setDocuments(xmlToObject(res.data).DOKUMENT);
      else setDocuments([]);
    });
  };

  const pregledaj = (id, type) => {
    const link = document.createElement("a");
    if (type == "SERTIFIKAT")
      link.href = `http://localhost:8081/api/${type[0].toLowerCase()}/html/${id}`;
    else
      link.href = `http://localhost:8082/api/${type[0].toLowerCase()}/html/${id}`;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const skini = (id, type) => {
    const link = document.createElement("a");
    if (type == "SERTIFIKAT")
      link.href = `http://localhost:8081/api/${type[0].toLowerCase()}/pdf/${id}`;
    else
      link.href = `http://localhost:8082/api/${type[0].toLowerCase()}/pdf/${id}`;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const extract = (tip, vrsta, id) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8081/api/metadata?tip=${tip}&vrsta=${vrsta}&id=${id}`;
    link.target = "_blank";
    //link.download(`${id}.${vrsta.toLowerCase()}`);
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
                <h1>Napredna Pretraga Dokumenata</h1>
                <div className="form-group">
                  <label>
                    <strong>Sadržaj</strong>
                  </label>
                  <div className="d-flex row justify-content-between">
                    <select
                      className="form-control"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value={"INTERESOVANJE"}>Interesovanja</option>
                      <option value={"SAGLASNOST"}>Saglasnosti</option>
                      <option value={"POTVRDA"}>Potvrde</option>
                      <option value={"ZAHTEV"}>Zahtevi</option>
                      <option value={"Sertifikati"}>Sertifikati</option>
                    </select>
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => pretraga()}
                    >
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
                      <th className="bg-none"></th>
                      <th className="bg-none"></th>
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
                              onClick={() => skini(doc.ID, doc.TIPDOKUMENTA)}
                            >
                              Skini
                            </button>
                          </td>
                          <td>
                            <button
                              class="btn btn-outline-primary"
                              onClick={() =>
                                extract(doc.TIPDOKUMENTA, "RDF", doc.ID)
                              }
                            >
                              Izvezi RDF
                            </button>
                          </td>
                          <td>
                            <button
                              class="btn btn-outline-primary"
                              onClick={() =>
                                extract(doc.TIPDOKUMENTA, "JSON", doc.ID)
                              }
                            >
                              Izvezi JSON
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
  );
};

export default AdvancedSearch;
