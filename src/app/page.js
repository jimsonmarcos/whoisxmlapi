"use client";

import { getDomainDetails } from "@/server-actions/whois";
import { useRef, useState } from "react";

export default function Home() {
  const [domainInformation, setDomainInformation] = useState([]);
  const [contactInformation, setContactInformation] = useState([]);
  const domainNameRef = useRef(null);

  const fetchDomainDetails = async (e) => {
    const domainInfo = [];
    const contactInfo = [];
    const domainName = domainNameRef.current.value;

    const response = await getDomainDetails(domainName);
    const data = response.WhoisRecord;
    console.log(data)

    domainInfo.push({
      domainName: data?.domainName || "N/A",
      registrar: data?.registrarName || "N/A",
      registrationDate: data?.createdDateNormalized || "N/A",
      expirationDate: data?.expiresDateNormalized || "N/A",
      estimatedDomainAge: `${data?.estimatedDomainAge} days` || "N/A",
      hostnames: data?.registryData?.nameServers.hostNames || "N/A",
    });

    contactInfo.push({
      registrantName: data?.registryData?.registrant?.name || data?.registrant?.name || "N/A",
      technicalContactName: data.registryData?.technicalContact?.name || data.technicalContact?.name || "N/A",
      administrativeContactName:
        data.registryData?.administrativeContact?.name || data.administrativeContact?.name || "N/A",
      contactEmail: data?.contactEmail || "N/A",
    });

    setDomainInformation(domainInfo);
    setContactInformation(contactInfo);
  };

  return (
    <main className="p-24">
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            WHOIS API Service
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Input domain name to fetch data from WHOIS.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="domainName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Domain Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm sm:max-w-md">
                  <input
                    type="text"
                    name="domainName"
                    id="domainName"
                    className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="google.com"
                    ref={domainNameRef}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={fetchDomainDetails}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="mt-6">
        <h5 className="text-2xl font-semibold">Domain Information</h5>

        <table className="border-collapse table-fixed w-full text-sm mt-5">
          <thead>
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Domain Name
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Registrar
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Registration Date
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Expiration Date
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Estimated Domain Age
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Hostnames
              </th>
            </tr>
          </thead>
          <tbody>
            {domainInformation.map((domainInfo, i) => (
              <tr key={i}>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {domainInfo.domainName}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {domainInfo.registrar}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {domainInfo.registrationDate}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {domainInfo.expirationDate}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {domainInfo.estimatedDomainAge}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  <ul>
                    {domainInfo.hostnames.map((hostname, i) => (
                      <li key={i}>{hostname}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h5 className="text-2xl font-semibold">Contact Information</h5>

        <table className="border-collapse table-fixed w-full text-sm mt-5">
          <thead>
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Registrant Name
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Technical Contact Name
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Administrative Contact Name
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                Contact Email
              </th>
            </tr>
          </thead>
          <tbody>
            {contactInformation.map((contactInfo, i) => (
              <tr key={i}>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {contactInfo.registrantName}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {contactInfo.technicalContactName}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {contactInfo.administrativeContactName}
                </td>
                <td className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-left">
                  {contactInfo.contactEmail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
