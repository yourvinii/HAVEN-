const sendEmail = async (options) => {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
    const senderEmail = process.env.EMAIL_USER?.trim();
    if (!BREVO_API_KEY || !senderEmail) {
      throw new Error("BREVO_API_KEY and EMAIL_USER must be configured");
    }

    const data = {
      sender: {
        name: "KDRent Platform",
        email: senderEmail,
      },
      to: [{ email: options.email }],
      subject: options.subject,
      htmlContent: options.message,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method:"POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Email successfuly sent by Brevo : ", response);
    } else {
      console.log("Brevo API key Error : ", result);
      throw new Error(result.message || "could not send email vai Brevo.");
    }
  } catch (error) {
    console.log("Brevo Email Error: ", error.message);
    throw new Error("Could not send email via Brevo");
  }
};

export default sendEmail;
