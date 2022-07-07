import { useEffect, useState } from "react";
import { getUstanove } from "../../services/UstanoveService";
import { xmlToObject } from "../../helpers/XmlToJsConverter";
import { azuriranje } from "../../services/VakcinaService";
import "./Vaccine.css";
import { toast } from "react-toastify";

export const Vaccine = () => {
  const [ustanove, setUstanove] = useState([]);
  const [vakcine, setVakcine] = useState([]);
  const [aktivnaUstanova, setAktivnaUstanova] = useState("");

  useEffect(() => {
    getUstanove().then((res) => {
      const ustanove2 = xmlToObject(res.data).USTANOVAVAKCINEDTO;
      setUstanove([...ustanove2]);
      setAktivnaUstanova(ustanove2[0].ID);
      setVakcine([...ustanove2[0].VAKCINE]);
    });
  }, []);

  const pregledajVakcine = (ustanova) => {
    setVakcine([...ustanova.VAKCINE]);
    setAktivnaUstanova(ustanova.ID);
  };

  const azuriraj = (doc) => {
    const azuriranjeXml = `<azuriranje><vakcina>${doc.TIPVAKCINE}</vakcina> <kolicina>${doc.KOLICINA}</kolicina><ustanova>${aktivnaUstanova}</ustanova><id>${doc.ID}</id></azuriranje>`;
    azuriranje(azuriranjeXml).then((res) => {
      toast("Uspesno azurirano!");
    });
  };

  return (
    <div className="row d-flex justify-content-around">
      <div className="tabela-levo">
        <table
          id="dataTable1"
          className="display table text-black dataTablesCard customer-list-tbl card-table  dataTable   mb-4 "
        >
          <thead>
            <tr className="bg-primary">
              <th>
                <strong className="font-w600 wspace-no">ID ustanove</strong>
              </th>
              <th>
                <strong className="font-w600 wspace-no">Naziv</strong>
              </th>
              <th>
                <strong className="font-w600 wspace-no">Lokacija</strong>
              </th>
              <th className="bg-none"></th>
            </tr>
          </thead>
          <tbody>
            {ustanove.map((doc, key) => {
              return (
                <tr
                  key={key}
                  className={aktivnaUstanova === doc.ID ? "aktivno" : ""}
                >
                  <td>{doc.ID}</td>
                  <td>{doc.USTANOVA}</td>
                  <td>{doc.OPSTINA}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => pregledajVakcine(doc)}
                    >
                      Pregledaj vakcine
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="tabela-levo">
        <table
          id="dataTable1"
          className="display table text-black dataTablesCard customer-list-tbl card-table  dataTable   mb-4 "
        >
          <thead>
            <tr className="bg-primary">
              <th>
                <strong className="font-w600 wspace-no">ID vakcine</strong>
              </th>
              <th>
                <strong className="font-w600 wspace-no">Tip</strong>
              </th>
              <th>
                <strong className="font-w600 wspace-no">Kolicina</strong>
              </th>
              <th className="bg-none"></th>
            </tr>
          </thead>
          <tbody>
            {vakcine.map((doc, key) => {
              return (
                <tr key={key}>
                  <td>{doc.ID}</td>
                  <td>{doc.TIPVAKCINE}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      name={doc.ID}
                      value={doc.KOLICINA}
                      onChange={(e) => {
                        doc.KOLICINA = e.target.value;
                        e.target.defaultValue = doc.KOLICINA;
                        setVakcine([...vakcine]);
                      }}
                    ></input>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => azuriraj(doc)}
                    >
                      Azuriraj
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vaccine;
