import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { toast } from 'react-toastify';

interface ILandlord {
  name: string;
  email: string;
}

const ContactPage = () => {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState<ILandlord | null>(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const { landlordId } = useParams();

  useEffect(() => {
    if (landlordId) {
      const getLandlord = async () => {
        const docRef = doc(db, 'users', landlordId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // TODO need to be reviewed...
          // @ts-ignore
          setLandlord(docSnap.data());
        } else {
          toast.error('Could not get landlord data');
        }
      };

      getLandlord();
    }
  }, [landlordId]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea name="message" id="message" className="textarea" value={message} onChange={onChange}></textarea>
            </div>

            <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
};

export default ContactPage;
