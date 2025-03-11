// app/services/[serviceId]/page.js

import ServiceDetailsComponent from "@/components/ServiceDetails"; // Import the client-side component
import ServiceData from "@/providers/ServiceData";
import Head from "next/head";

export function generateStaticParams() {
    const serviceIds = Object.keys(ServiceData);
    return serviceIds.map((serviceId) => ({
      serviceId: serviceId.replace(/&/g, 'and').toLowerCase(), // Ensure serviceId format consistency
    }));
  }

export default function ServiceDetailPage({ params }) { // Renamed function to avoid conflict
  const { serviceId } = params;
  const service = ServiceData[serviceId];

  if (!service) {
    return <div>Service not found</div>;
  }

  // Pass serviceId to the client-side component
  return (
    <div>
      <Head>
        <title> {`Net2AI | ${serviceId}`}</title>
        <meta name="description" content="Contact Net2AI for any inquiries or support."/>
      </Head>
      {/* Render client-side logic */}
      <ServiceDetailsComponent serviceId={serviceId} />
    </div>
  );
}
