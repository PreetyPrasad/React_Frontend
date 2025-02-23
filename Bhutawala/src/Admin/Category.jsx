import { useEffect, useState } from "react";
import { categoriesSchema } from "../Schema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getData, postData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import FilterTable from "./filtertable";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [initialValues, setInitialValues] = useState({ Category: "" });

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await getData("Category/List");
      if (response.status.toLowerCase() === "ok") {
        setCategories(response.result);
      } else {
        toast.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("API error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete Category
  const deleteData = async (Id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await getData(`Category/Remove/${Id}`);
        if (response.status.toLowerCase() === "ok") {
          toast.success("Category deleted successfully");
          fetchCategories();
        } else {
          toast.error("Error deleting category");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("API error occurred");
      }
    }
  };

  // Add or Edit Category
  const postCategoryData = async (data) => {
    setLoading(true);
    const postRequest = { categoryName: data.Category, categoryId: categoryId };

    try {
      const result = await postData(
        categoryId === 0 ? "Category/Save" : "Category/Edit",
        postRequest
      );

      if (result.status.toLowerCase() === "ok") {
        toast.success(categoryId === 0 ? "Category added" : "Category updated");
        cancelForm(); // Reset form
        fetchCategories(); // Refresh categories
      } else {
        toast.error("Category already exists");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("API error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Reset Form
  const cancelForm = () => {
    setCategoryId(0);
    setInitialValues({ Category: "" });
  };

  // Fetch Category Details (For Edit)
  const fetchCategoryDetail = async (Id) => {
    try {
      const response = await getData(`Category/Details/${Id}`);
      if (response.status.toLowerCase() === "ok") {
        setCategoryId(response.result.categoryId);
        setInitialValues({ Category: response.result.categoryName });
      } else {
        toast.error("Error fetching category details");
      }
    } catch (error) {
      console.error("Fetch detail error:", error);
    }
  };

  // Edit Button Template
  const editTemplate = (category) => (
    <span onClick={() => fetchCategoryDetail(category.categoryId)}>
      <i style={{ color: "#0A003A" }} className="fas fa-edit"></i>
    </span>
  );

  // Delete Button Template
  const deleteTemplate = (category) => (
    <span
      onClick={() => deleteData(category.categoryId)}
      style={{ cursor: "pointer" }}
    >
      <i style={{ color: "#0A003A" }} className="fas fa-trash"></i>
    </span>
  );

  return (
    <div className="container">
      <h3>Manage Categories</h3><Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={categoriesSchema}
        onSubmit={(values, { resetForm }) => {
          postCategoryData(values);
          resetForm(); // Reset form fields after submission
          cancelForm(); // Reset categoryId and initialValues
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group mb-2">
              <label htmlFor="Category">Category Name</label>
              <Field
                id="Category"
                className={`form-control ${errors.Category && touched.Category ? "is-invalid" : ""}`}
                name="Category"
                type="text"
                placeholder="Enter category name"
              />
              <ErrorMessage name="Category" component="div" className="invalid-feedback" />
            </div>
            <button disabled={loading} className="btn btn-primary" type="submit">
              {loading ? "Saving..." : "Submit"}
            </button>
            &nbsp;
            <button type="reset" className="btn btn-danger" onClick={cancelForm}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>

      <FilterTable />

      <div className="table-responsive">
        <DataTable
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          size="small"
          value={categories}
        >
          <Column field="categoryId" sortable header="#" />
          <Column field="categoryName" sortable header="Name" />
          <Column style={{ width: "30px" }} body={deleteTemplate} header="Delete" />
          <Column style={{ width: "30px" }} body={editTemplate} header="Edit" />
        </DataTable>
      </div>
    </div>
  );
}
