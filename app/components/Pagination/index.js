import React from 'react';
import Pagination from 'react-js-pagination';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather';
import messages from 'components/Pagination/messages';

function PaginationComponent({
  handleCallbackPage,
  pageCount,
  limit,
  showLengthData,
  activePage,
  lastPage,
}) {
  const intl = useIntl();
  const handlePageChange = pageNumber => {
    handleCallbackPage(pageNumber);
  };

  const showMinPage = activePage === 1 ? 1 : limit * (activePage - 1) + 1;
  const showMaxPage =
    lastPage !== activePage ? activePage * showLengthData : pageCount;

  return (
    <div className="pagination-custom d-flex justify-content-between align-items-center">
      <div className="pagination-custom__text">
        <p className="m-0">
          <FormattedMessage
            {...messages.showDataText}
            values={{
              limitPage: (
                <span>
                  {showLengthData === 1
                    ? pageCount
                    : `${showMinPage} ${intl.formatMessage({
                        ...messages.showCross,
                      })} ${showMaxPage}`}
                </span>
              ),
              totalPage: <span>{pageCount}</span>,
            }}
          />
        </p>
      </div>
      <Pagination
        prevPageText={<ChevronLeft />}
        firstPageText={<ChevronsLeft />}
        lastPageText={<ChevronsRight />}
        nextPageText={<ChevronRight />}
        activePage={parseInt(activePage, 10)}
        itemsCountPerPage={parseInt(limit, 10)}
        totalItemsCount={pageCount}
        pageRangeDisplayed={5}
        hideDisabled
        hideNavigation={pageCount <= limit * 5}
        hideFirstLastPages={pageCount <= limit * 5}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default PaginationComponent;
