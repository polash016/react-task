import { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [formData, setFormData] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const status = form.status.value;
    const newData = { name, status };
    console.log(name, status);
    const existingData = JSON.parse(localStorage.getItem("form-data")) || [];
    const updatedData = [...existingData, newData];
    localStorage.setItem("form-data", JSON.stringify(updatedData));
    setFormData(updatedData);
  };

  useEffect(() => {
    try {
      const data = localStorage.getItem("form-data");

      if (show === "all") {
        // setFormData(JSON.parse(data));
        const parsedData = JSON.parse(data);
        const activeData = parsedData.filter(
          (item) => item.status === "active"
        );
        const completedData = parsedData.filter(
          (item) => item.status === "completed" || item.status === "complete"
        );
        const remainingData = parsedData.filter(
          (item) =>
            item.status !== "active" &&
            item.status !== "completed" &&
            item.status !== "complete"
        );
        setFormData([...activeData, ...completedData, ...remainingData]);
      }
      if (show === "active") {
        const formData = JSON.parse(data);
        setFormData(formData.filter((item) => item.status === "active"));
      }
      if (show === "completed") {
        const formData = JSON.parse(data);
        setFormData(formData.filter((item) => item.status === "completed"));
      }
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
    }
  }, [show]);
  console.log(formData);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
