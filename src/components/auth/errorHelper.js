//@/components/auth/errorHelper.js

export const handleError = (error, setSnackbar) => {
    let errorMessage = "An error occurred. Please try again.";
    let backgroundColor = "#D32F2F"; // Red for errors
  
    if (error.response) {
      const data = error.response.data;
  
      if (data.error) {
        // If API returns a general error
        errorMessage = data.error;
      } else if (data.errors) {
        // Extract Mongoose validation errors
        const errorMessages = Object.values(data.errors).map((err) => err.message);
        errorMessage = errorMessages.join(" | ");
      }
    }
  
    setSnackbar({ open: true, message: errorMessage, messageBack: backgroundColor });
  };
  