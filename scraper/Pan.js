import puppeteer from "puppeteer";

async function scrapePANForm() {
  const browser = await puppeteer.launch({
    headless: false, // change to true if you don't want to see browser
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();

  // ✅ Ensure full https URL
  const url = "https://udyamregistration.gov.in/UdyamRegistration.aspx";
  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 0, // disable timeout for slow loading pages
  });

  // Wait for at least one known field (like PAN input)
  await page.waitForSelector("#MainContent_txtAadhar"); // replace with correct selector if needed

  // Extract input, select, textarea details
  const fields = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("input, select, textarea")).map(el => {
      let labelText = "";
      if (el.labels && el.labels.length > 0) {
        labelText = el.labels[0].innerText.trim();
      }
      return {
        tag: el.tagName.toLowerCase(),
        type: el.type || null,
        id: el.id || null,
        name: el.name || null,
        placeholder: el.placeholder || null,
        label: labelText || null
      };
    });
  });

  console.log(JSON.stringify(fields, null, 2));

  await browser.close();
}

scrapePANForm().catch(err => console.error(err));
