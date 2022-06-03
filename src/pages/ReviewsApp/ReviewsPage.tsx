import { useContext } from 'react';
import { ReviewForm, ReviewList, ReviewToolbar, Layout } from '../../components/ReviewApp';
import { useParams } from 'react-router-dom';
import { ReviewContext } from '../../context/review.context';

const ReviewsPage = () => {
  const { reviews } = useContext(ReviewContext);
  const { id: pageId } = useParams();

  return (
    <Layout>
      {pageId && <h1>{pageId}</h1>}
      <ReviewForm />
      <ReviewToolbar reviews={reviews} className="ratings-toolbar" />
      <ReviewList reviews={reviews} />
    </Layout>
  );
};

export default ReviewsPage;
