import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import { registerLicense } from '@syncfusion/ej2-base';


function EditBtn({image}:any) {
  const [show, setShow] = useState(false);
  registerLicense(
    "ORg4AjUWIQA/Gnt2UFhhQlJBfVpdWnxLflFyVWRTfFx6dlJWACFaRnZdRl1nSXlSf0FlWnlZeHZX"
  );
    return (
      <>
        <button
          onClick={() => setShow(!show)}
          className="absolute top-4 left-4 btn-ghost hidden group-hover:btn group-hover:btn-circle">
          <FaRegEdit size={30} />
        </button>
        
          {
            show && <div className='fixed top-0 bottom-0 right-0 w-1/2 left-0 z-50'><ImageEditorComponent /></div>
          }
        
        
      </>
    );
}
export default EditBtn
