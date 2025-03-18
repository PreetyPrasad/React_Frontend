import React, { useEffect, useState } from 'react'
import { getData } from '../../API';
import { useFormik } from 'formik';
// import { DetailSchema } from '../Schema';

export default function DetailPopup(props) {

    const [dataLoading, setDataLoading] = useState(false);
    const [Materials, setMaterials] = useState([]);
    const [MaterialDetails, setMaterialDetails] = useState({});
    const [initialValues, setinitialValues] = useState({
        "MaterialId": "",
        "Qty": "",
        "Price": "",
        "Total": "",
    });


    const calculateGST = (rate, gstPercentage, gstType) => {
        let GSTAmt = 0;
        let NetRate = 0;
        let TotalAmount = 0;
    
        // ✅ Inclusive GST Calculation
        if (gstType.toLowerCase() === "inclusive") {
            GSTAmt = rate - (rate / (1 + gstPercentage / 100));
            NetRate = rate / (1 + gstPercentage / 100);
            TotalAmount = rate;
        }
        // ✅ Exclusive GST Calculation
        else if (gstType.toLowerCase() === "exclusive") {
            GSTAmt = (rate * gstPercentage) / 100;
            NetRate = rate;
            TotalAmount = rate + GSTAmt;
        }
    
        // ✅ Return Results as Object
        return {
            GSTAmount: GSTAmt.toFixed(2),
            NetRate: NetRate.toFixed(2),
            TotalAmount: TotalAmount.toFixed(2)
        };
    }


    const { handleSubmit, handleChange, handleBlur, errors, values, resetForm, setFieldValue, touched } = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: DetailSchema,
        onSubmit: async (values) => {
    
            // ✅ Initialize Variables
            let Rate = values.Price;  // Price entered by User
            let gst = MaterialDetails.gst; // GST Percentage
            
            let result = calculateGST(Rate, gst, MaterialDetails.gsT_Type);
    
            // ✅ Prepare Request Data
            const requestData = {
                MaterialId: values.MaterialId,
                Unit: MaterialDetails.qty + " " + MaterialDetails.unit,
                Qty: values.Qty,
                MaterialName: MaterialDetails.materialName,
                Rate: parseFloat(result.NetRate).toFixed(2),
                GSTAmount: parseFloat(result.GSTAmount).toFixed(2),
                GST: MaterialDetails.gst,
                Total: (((parseFloat(result.NetRate) + parseFloat(result.GSTAmount)) * values.Qty)).toFixed(2)  // ✅ Final Total Including GST
            };
    
            // ✅ Push Data to Invoice Array
            props.setInvoiceProducts([...props.invoiceProducts, requestData]);
    
            console.log("Request Data:", requestData);
    
            // ✅ Reset Form After Submit
            resetForm();
            props.setshowInvoicePopup(false);
        }
    });
    

    const fetchMaterials = async () => {
        try {
            setDataLoading(true);
            const response = await getData("Material/List");
            console.log(response)
            if (response.status.toUpperCase() == "OK") {
                setMaterials(response.result);
                console.log(response.result);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            errorAlert("Error fetching data in component:", error);
        }
        finally {
            setDataLoading(false);
        }
    };


    const getMaterialDetil = (Id) => {
        if (Id != "") {
            var data = Materials.find(o => o.materialId == Id);
            setMaterialDetails(data);
            console.log("Details", data);
            setFieldValue("Price", data.price);
            setFieldValue("Qty", 1);
            setFieldValue("Total", data.price * 1);
            setFieldValue("MaterialId", data.materialId);
        }
        else {
            setMaterialDetails({});
        }
    }

    const handleQtyChange = (e) => {
        const qty = e.target.value;
        setFieldValue("Qty", qty);
        setFieldValue("Total", qty * values.Price);

        document.getElementById("txtTotal").value = (qty * values.Price);
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className={props.showInvoicePopup ? "modal show" : "modal"} style={props.showInvoicePopup ? { display: "block" } : null} id="MaterialInvoice">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Invoice Detail</h4>
                            <button type="button" onClick={() => props.setshowInvoicePopup(false)} className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <div className="text-start">
                                    <strong>Material</strong>
                                    <span className='text-danger'>*</span>
                                        {/* <label className='text-left d-block'>Material</label> */}
                                    </div>
                                    <select name="drpMaterial" onChange={(e) => getMaterialDetil(e.target.value)} className='form-select' id="drpMaterial">
                                        <option value="">Select Material</option>
                                        {
                                            Materials.map((o, index) => {
                                                return <option value={o.materialId}>{o.category.categoryName.toUpperCase()} {o.materialName.toUpperCase()}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-5 mb-2">
                                    <div className="input-group">
                                        <input type="text" className='form-control' onChange={handleChange} onBlur={handleBlur} name='txtRate' id='txtRate' placeholder='Rate of Material' value={values.Price} readOnly />
                                        <span className="input-group-text">
                                            {MaterialDetails.unit}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-1 mb-2">
                                    <label className='form-control text-center'>X</label>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <input type="text" className='form-control text-center' onChange={handleQtyChange} onBlur={handleBlur} placeholder='Qty' name='txtQty' id='txtQty' value={values.Qty} />
                                </div>
                                <div className="col-md-1 mb-2">
                                    <label className='form-control text-center'>=</label>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <input type="text" className='form-control' name='txtTotal' id='txtTotal' value={values.Total} placeholder='₹ Total ' readOnly />
                                </div>
                                {(errors.MaterialId || errors.Qty || errors.Total || errors.Price) && (
                                    <div className="col-md-12 text-danger">
                                        <ul className='text-start ps-3' style={{ textAlign: 'left' }}>
                                            {errors.MaterialId && touched.MaterialId && <li>{errors.MaterialId}</li>}
                                            {errors.Qty && touched.Qty && <li>{errors.Qty}</li>}
                                            {errors.Total && touched.Total && <li>{errors.Total}</li>}
                                            {errors.Price && touched.Price && <li>{errors.Price}</li>}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id='btnSave' type='submit' disabled={!props.loading ? false : true} className='btn btn-primary'>{!props.loading ? "Save" : "Please Wait"}</button>
                            <button onClick={() => props.setshowInvoicePopup(false)} type="button" className="btn btn-danger">Close</button>
                        </div>
                    </div>
                </div>
            </form>
            {
                props.showInvoicePopup ? <div className="modal-backdrop show" /> : null
            }
        </>
    )
}
