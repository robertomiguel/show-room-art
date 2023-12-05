
export const formatDate = (d) => {
    if (!d) return ''
    const fechaEnMilisegundos = d.seconds * 1000 + Math.round(d.nanoseconds / 1000000);
    const date = new Date(fechaEnMilisegundos)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  export const formatFireToDate = (d) => {
    if (!d) return ''
    const fechaEnMilisegundos = d.seconds * 1000 + Math.round(d.nanoseconds / 1000000);
    return new Date(fechaEnMilisegundos)
  }
  