"use server";

export const getDomainDetails = async (domainName) => {
  try {
    const response = await fetch(
      `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.NEXT_PUBLIC_WHOIS_API_KEY}&domainName=${domainName}&outputFormat=json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};
