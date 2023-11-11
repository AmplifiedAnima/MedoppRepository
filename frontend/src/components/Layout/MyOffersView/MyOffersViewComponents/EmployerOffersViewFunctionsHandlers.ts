export const deleteOffer = async (offerId: string) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`http://localhost:3000/offers/${offerId}`, {
      method: "DELETE",
      headers: headers,
    });

    if (response.ok) {
      console.log("Offer has been deleted");
      return true;
    } else {
      console.error("Error deleting offer: ", response.status);
      return false; 
    }
  } catch (error) {
    console.error("Error: ", error);
    return false; 
  }
};

// to be finished
// const handleOfferEdition = async (offerId: string) => {
//   try {
//     const token = localStorage.getItem("token");

//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await fetch(`http://localhost:3000/offers/${offerId}`, {
//       method: "PATCH",
//       headers: headers,
//     });

//     if (response.ok) {
//       console.log("Offer has been edited");
//     } else {
//       console.log("Error editing offer: ", response.status);
//     }
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// };
