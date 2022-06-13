import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { toast } from 'react-toastify';
import { Spinner, ListingItem } from '@/components';

interface ISnap {
  id: string;
  data: DocumentData;
}

const OffersPage = () => {
  const [listings, setListings] = useState<ISnap[] | null>(null);
  const [lastFetchedListing, setLastFetchedListing] = useState<ISnap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10));

        // Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const newListings: ISnap[] = [];

        querySnap.forEach((doc) => {
          return newListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(newListings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    };

    fetchListings();
  }, []);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const newListings: ISnap[] = [];

      querySnap.forEach((doc) => {
        return newListings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState: ISnap[] | null) => (prevState ? [...prevState, ...newListings] : [...newListings]));
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
};

export default OffersPage;
