import { Review } from '../Review';
import { IReviewListProps } from './ReviewList.props';
import { motion, AnimatePresence } from 'framer-motion';

export const ReviewList = ({ reviews, ...props }: IReviewListProps) => {
  return (
    <ul className="ratings-list" {...props}>
      <AnimatePresence>
        {reviews &&
          reviews.map((r) => (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, transform: 'translateX(-100%)', height: 0 }}
              animate={{ opacity: 1, transform: 'translateX(0%)', height: 'unset' }}
              exit={{ opacity: 0, transform: 'translateX(100%)', height: 0 }}>
              <Review reviewId={r.id} rating={r.rating} text={r.text} />
            </motion.li>
          ))}
      </AnimatePresence>
    </ul>
  );
};
