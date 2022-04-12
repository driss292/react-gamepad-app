import "../ReviewCpt/review.scss";

const Review = ({ item, userToken }) => {
  return (
    <div>
      <p>{userToken}</p>
      <p>{item.title}</p>
      <p>{item.text}</p>
    </div>
  );
};

export default Review;
