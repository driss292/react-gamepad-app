import "../ReviewCpt/review.scss";

const Review = ({ item }) => {
  return (
    <div>
      <p>{item.title}</p>
      <p>{item.text}</p>
    </div>
  );
};

export default Review;
