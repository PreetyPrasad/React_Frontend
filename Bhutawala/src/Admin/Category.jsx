import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { categoriesSchema } from '../Schema';
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [dataloading, setDataLoading] = useState(false);
  const [category, setCategorys] = useState([]);
  const [CategoryId, setCategoryId] = useState(0);
  const [initialValue, setInitalValue] = useState({
    CategoryName: ""
  });
  const { handleBlur, handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: initialValue,
    validationSchema: categoriesSchema,
    enableReinitialize: true,
    onSubmit: async (response) => {
      const requestData = {
        "CategoryName": values.CategoryName,
        "CategoryId": CategoryId
      };
      try {
        setLoading(true);
        const result = await postData(
          (CategoryId == 0 ? "Category/Save" : "Category/Edit"),
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          fetchCategorys();
        }
        else {
          alert("Already Exists");
        }
      }
      catch (error) {
        console.error("Error  posting data in component:", error.message);
      }
      finally {
        setLoading(false);
        clearForm();
      }
    }
  });

  const fetchCategorys = async () => {
    try {
      setDataLoading(true);
      const response = await getData("Category/List");
      if (response.status.toUpperCase() == "OK") {
        setCategorys(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
    finally {
      setDataLoading(false);
    }
  };

  const fetchCategoryDetail = async (Id) => {
    try {
      const response = await getData("Category/Details/" + Id);
      if (response.status == "OK") {
        setInitalValue({
          CategoryName: response.result.categoryName
        })
        setCategoryId(response.result.categoryId);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  }

  const deleteCategory = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("Category/Remove/" + Id);
        if (response.status == "OK") {
          setCategoryId(response.result)
          console.log(response.result);
          fetchCategorys();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
      finally {
        setDataLoading(false);
      }
    }
  }
  const clearForm = () => {
    setInitalValue({ CategoryName: "" });
    setCategoryId(0);
  }
  const deleteTemplate = (category) => {
    return <i onClick={() => deleteCategory(category.categoryId)} className='fas fa-trash text-danger'></i>;
  };
  const editTemplate = (category) => {
    return <i onClick={() => fetchCategoryDetail(category.categoryId)} className='fas fa-edit text-success '></i>;
  };
  useEffect(() => {
    fetchCategorys();
  }, []);
  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">Category</h4></div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12 mb-2 ">
                  <b>CategoryName</b><span className="text-danger">*{errors.CategoryName}</span>
                  <input type="text" value={values.CategoryName} onChange={handleChange}
                    onBlur={handleBlur} id='CategoryName' name='CategoryName' className="form-control " placeholder="CategoryName" />
                </div>
                <div className="col-md-12 mb-2 ">
                  <button id='btnSave' type='submit' disabled={!loading ? false : true} className='open-modal-btn'>{!loading ? "Save" : "Please Wait"}</button>&nbsp;
                  <button id='btnCancle' type='reset' className='btn-custom btn-cancel' onClick={clearForm}>Cancel</button>
                </div>
                <div className='col-md-12 tabl-responsive'>
                  <DataTable value={category} loading={dataloading} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="categoryId" header="categoryId"></Column>
                    <Column field="categoryName" header="CategoryName" sortable ></Column>
                    <Column body={editTemplate} className='text-center' style={{ width: '50px' }}></Column>
                    <Column body={deleteTemplate} className='text-center' style={{ width: '50px' }}></Column>
                  </DataTable>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
