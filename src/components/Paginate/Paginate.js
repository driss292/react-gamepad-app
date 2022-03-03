import ReactPaginate from "react-paginate";
import "../Paginate/paginate.scss";

const Paginate = ({ setPage, numberOfPages }) => {
  const handlePageClick = (data) => {
    console.log(data.selected);
    setPage(data.selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={numberOfPages}
      marginPagesDisplayed={3}
      onPageChange={handlePageClick}
      className="paginate"
    />
  );
};

export default Paginate;
