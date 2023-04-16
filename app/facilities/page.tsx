import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import FacilitiesClient from "./FacilitiesClient";

const FacilitiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Facilities found"
          subtitle="Looks like you have no Facilities."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FacilitiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FacilitiesPage;
