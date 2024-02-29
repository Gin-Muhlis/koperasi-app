"use client";
import Swal from 'sweetalert2';

import { useEffect } from 'react'

const SweetAlertPopup = ({status, message, resetState}: {status: number | boolean, message: string, resetState: () => void}) => {
    useEffect(() => {
        Swal.fire({
          html: `<strong>${message}</strong>`,
          icon: status === 200 ? 'success' : 'error',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            resetState()
          }
        });
      }, [status]);
    
      return null;
}

export default SweetAlertPopup