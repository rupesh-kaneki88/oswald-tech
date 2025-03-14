// app/services/[serviceId]/page.js

import ServiceDetailsComponent from "@/components/ServiceDetails"; // Import the client-side component
import ServiceData from "@/providers/ServiceData";

export function generateStaticParams() {
    const serviceIds = Object.keys(ServiceData);
    return serviceIds.map((serviceId) => ({
      serviceId: serviceId.replace(/&/g, 'and').toLowerCase(), // Ensure serviceId format consistency
    }));
  }

  export const metadata = {
    title: `Get2AI | Services in details`,
    description: "About Get2AI technologies",
  };

export default function ServiceDetailPage({ params }) { // Renamed function to avoid conflict
  const { serviceId } = params;
  const service = ServiceData[serviceId];

  if (!service) {
    return <div>Service not found</div>;
  }

  // Pass serviceId to the client-side component
  return (
    <div>
      {/* Render client-side logic */}
      <ServiceDetailsComponent serviceId={serviceId} />
    </div>
  );
}
