import puppeteer from "puppeteer";

const scrapeAadhaarForm = async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
    waitUntil: "domcontentloaded",
  });

  // Wait for iframe to appear
  await page.waitForSelector("iframe", { timeout: 60000 });

  // Get iframe handle
  const frameHandle = await page.$("iframe");
  const frame = await frameHandle.contentFrame();

  // Wait for Aadhaar number field inside the iframe
  await frame.waitForSelector("#txtAdhaar", { timeout: 60000 });

  const formData = await frame.evaluate(() => {
    return {
      formTitle: "Aadhaar Verification With OTP",
      fields: [
        {
          id: "aadhaar_number",
          label: document.querySelector('label[for="txtAdhaar"]')?.innerText.trim() || "Aadhaar Number / आधार संख्या",
          type: "text",
          placeholder: document.querySelector("#txtAdhaar")?.getAttribute("placeholder") || "Your Aadhaar No",
          required: true,
          validation: {
            pattern: "^[0-9]{12}$",
            errorMessage: "Please enter a valid 12-digit Aadhaar number."
          }
        },
        {
          id: "entrepreneur_name",
          label: document.querySelector('label[for="txtName"]')?.innerText.trim() || "Name of Entrepreneur / उद्यमी का नाम",
          type: "text",
          placeholder: document.querySelector("#txtName")?.getAttribute("placeholder") || "",
          required: true
        },
        {
          id: "aadhaar_consent",
          type: "checkbox",
          label: document.querySelector("#chkAadharConsent")?.parentElement.innerText.trim() || "",
          required: true
        }
      ],
      instructions: [
        "Aadhaar number shall be required for Udyam Registration.",
        "The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).",
        "In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN (As per applicability of CGST Act 2017 and as notified by the ministry of MSME vide S.O. 1055(E) dated 05th March 2021) and PAN along with its Aadhaar number."
      ],
      buttons: [
        {
          id: "btnValidate",
          label: document.querySelector("#btnValidate")?.value || "Validate & Generate OTP",
          action: "generateOTP"
        }
      ],
      errorMessages: [
        "There is error in Aadhaar Validation/Authentication.",
        "Error Code: Invalid Auth XML format. 510",
        "Your Aadhaar has not been validated hence you cannot register Udyam.",
        "Please Visit Your Nearest Aadhaar Enrolment Centre."
      ]
    };
  });

  console.log(JSON.stringify(formData, null, 2));
  await browser.close();
};

scrapeAadhaarForm();
