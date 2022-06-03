import { useContext } from 'react';
import { ReviewForm, ReviewList, ReviewToolbar } from '../components';
import { useParams } from 'react-router-dom';
import { ReviewContext } from '../context/review.context';

const ReviewsPage = () => {
  const { reviews } = useContext(ReviewContext);
  const { id: pageId } = useParams();

  return (
    <>
      {pageId && <h1>{pageId}</h1>}
      <ReviewForm />
      <ReviewToolbar reviews={reviews} className="ratings-toolbar" />
      <ReviewList reviews={reviews} />
    </>
  );
};

export default ReviewsPage;
