import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase.config';
import { Spinner } from '@/components';
import shareIcon from '@/assets/svg/shareIcon.svg';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface ISnap {
  id: string;
  data: DocumentData;
  imageUrls: string[];
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  geolocation: {
    _lat: number;
    _long: number;
  };
  discountedPrice?: number;
  regularPrice: number;
  location: string;
  type: string;
  offer: boolean;
  userRef: string;
}

const ListingPage = () => {
  const [listing, setListing] = useState<ISnap | null>(null);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  console.log(listing);

  const navigate = useNavigate();
  const { listingId } = useParams();
  const auth = getAuth();

  useEffect(() => {
    if (listingId) {
      const fetchListing = async () => {
        const docRef = doc(db, 'listings', listingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // TODO need to be reviewed...
          // @ts-ignore
          const newListing: ISnap | null = docSnap.data();
          setListing(newListing);
        }
      };

      fetchListing();
    }
  }, [navigate, listingId]);

  if (listing) {
    return (
      <main>
        <Helmet>
          <title>{listing.name}</title>
        </Helmet>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listing.imageUrls &&
            listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[index]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className="swiperSlideDiv"></div>
              </SwiperSlide>
            ))}
        </Swiper>

        <div
          className="shareIconDiv"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}>
          <img src={shareIcon} alt="" />
        </div>

        {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

        <div className="listingDetails">
          <p className="listingName">
            {listing.name} - $
            {listing.offer && listing.discountedPrice
              ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <p className="listingLocation">{listing.location}</p>
          <p className="listingType">For {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
          {listing.offer && listing.discountedPrice && (
            <p className="discountPrice">${listing.regularPrice - listing.discountedPrice} discount</p>
          )}

          <ul className="listingDetailsList">
            <li>{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}</li>
            <li>{listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}</li>
            <li>{listing.parking && 'Parking Spot'}</li>
            <li>{listing.furnished && 'Furnished'}</li>
          </ul>

          <p className="listingLocationTitle">Location</p>

          <div className="leafletContainer">
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              center={[listing.geolocation._lat, listing.geolocation._long]}
              zoom={13}
              scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              />

              <Marker position={[listing.geolocation._lat, listing.geolocation._long]}>
                <Popup>{listing.location}</Popup>
              </Marker>
            </MapContainer>
          </div>

          {auth.currentUser?.uid !== listing.userRef && (
            <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton">
              Contact Landlord
            </Link>
          )}
        </div>
      </main>
    );
  }

  return <Spinner />;
};

export default ListingPage;
