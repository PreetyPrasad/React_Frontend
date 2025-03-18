import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { CategorySchema } from '../Schema';
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { confirmationAlert, errorAlert, successAlert, warningAlert } from '../SweetAlert/SuccessAlert';

export default function Category() {

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [CategoryId, setCategoryId] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    categoryName: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [initialValue, setInitialValue] = useState({
    CategoryName: ""
  });

  const { handleSubmit, handleBlur, handleChange, errors, values, resetForm } = useFormik({
    initialValues: initialValue,
    validationSchema: CategorySchema,
    enableReinitialize: true,
    onSubmit: async (response) => {

      const requestData = {
        "CategoryName": values.CategoryName.toUpperCase(),
        "CategoryId": CategoryId
      };

      try {
        setLoading(true);
        const result = await postData(
          (CategoryId == 0 ? "Category/Save" : "Category/Edit"),
          requestData

        );

        console.log(result);
        resetForm();
        if (result.status.toUpperCase() === "OK") {
          successAlert("Saved", "Category save Successfully");
          // alert("Successsfully Saved");
          clearForm();
          fetchCategories();

        }
        else {
          errorAlert("Error", "Already Exists");
        }
      }
      catch (error) {
        errorAlert("Error posting data in component:", error.message);
      }
      finally {
        setLoading(false);
      }
    }
  });

  const fetchCategories = async () => {
    try {
      setDataLoading(true);
      const response = await getData("Category/List");
      if (response.status == "OK") {
        setCategories(response.result);
        console.log(response.result);
        // successAlert("Saved","Successfully Saved..!!");
      } else {
        warningAlert("OOPS", "Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
    finally {
      setDataLoading(false);
    }
  };

  const deleteCategory = async (Id) => {
    var conform = await confirmationAlert("Are you sure to delete...?");
    console.log(conform);
    if (conform) {
      try {
        setDataLoading(true);
        const response = await getData("Category/Remove/" + Id);
        if (response.status == "OK") {
          fetchCategories();
          successAlert("Are you sure to Delete...??");
        } else {
          warningAlert("OOPS", "Something went wrong");
          console.log("Something went wrong");
        }
      } catch (error) {
        errorAlert("Error fetching data in component:", error);
      }
    }
  }

  const fetchCategoryDetail = async (Id) => {
    try {
      const response = await getData("Category/Details/" + Id);
      if (response.status == "OK") {
        setInitialValue({
          CategoryName: response.result.categoryName
        });
        setCategoryId(response.result.categoryId)
      } else {
        warningAlert("OOPS", "Something went wrong");
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
  };

  const clearForm = () => {
    setInitialValue({
      CategoryName: ""
    });
    setCategoryId(0);
  }

  const editTemplate = (category) => {
    return <i onClick={() => fetchCategoryDetail(category.categoryId)} className='fas fa-edit text-success' ></i>;
  };

  const deleteTemplate = (category) => {
    return <i onClick={() => deleteCategory(category.categoryId)} className='fas fa-trash text-danger'></i>;
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12 mb-2">
                  <b>Category</b> <span className='text-danger'>*{errors.CategoryName}</span>
                  <input type="text" value={values.CategoryName} onChange={handleChange} onBlur={handleBlur} id='CategoryName' name='CategoryName' className='form-control' placeholder='Category Name' />
                </div>
                <div className="col-md-8 mb-2">
                  <button id='btnSave' type='submit' disabled={!loading ? false : true} className='open-modal-btn'>{!loading ? " Save" : "Please Wait"}</button>&nbsp;
                  <button id='btnCancle' onClick={() => clearForm()} type='reset' className='btn-custom btn-cancel'>Cancle</button>
                </div>
                <div className='col-md-4 mb-2'>
                  <div className="input-group">
                    <input type="text" className="form-control" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                    <span className="input-group-text"> <i className="fas fa-search"></i></span>
                  </div>
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable filters={filters} globalFilterFields={['categoryName']} stripedRows size='small' showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 15]} tableStyle={{ minWidth: '50rem' }} className='p-datatable-header' loading={dataLoading} value={categories}>
                    <Column field="categoryName" header="Categories" sortable ></Column>
                    <Column body={editTemplate} className='text-center' style={{ width: "50px" }}></Column>
                    <Column body={deleteTemplate} className='text-center' style={{ width: "50px" }}></Column>
                  </DataTable>
                </div>
              </form>
            </div>
          </div>
          {/* end card */}
        </div>
        {/* end col */}
      </div>
      {/* end row */}
    </div>
  )
}
