import clsx from 'clsx';
import React from 'react';
import ContentLoader from 'react-content-loader';

const EmployeeLoader = props => (
  <div
    className={clsx(
      props.className === 'vertical' ? 'col-xl-3 col-sm-4' : 'col-12',
    )}
  >
    <div className="employee-item">
      {props.className === 'vertical' ? (
        <ContentLoader
          speed={1.5}
          viewBox="0 0 333 361"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="loader"
        >
          <rect x="0" y="0" rx="24" ry="24" width="73" height="73" />
          <rect x="300" y="30" rx="6" ry="6" width="24" height="24" />
          <rect x="0" y="120" rx="4" ry="4" width="206" height="15" />
          <rect x="0" y="150" rx="4" ry="4" width="120" height="12" />

          <rect x="74" y="200" rx="5" ry="5" width="150" height="20" />
          <rect x="74" y="250" rx="5" ry="5" width="150" height="20" />
          <rect x="74" y="300" rx="5" ry="5" width="150" height="20" />
          <rect x="3" y="200" rx="5" ry="5" width="20" height="20" />
          <rect x="3" y="250" rx="4" ry="4" width="20" height="20" />
          <rect x="3" y="300" rx="4" ry="4" width="20" height="20" />
        </ContentLoader>
      ) : (
        <ContentLoader viewBox="0 0 340 50" className="loader">
          <rect x="0" y="0" width="67" height="11" rx="3" />
          <rect x="76" y="0" width="140" height="11" rx="3" />
          <rect x="127" y="48" width="53" height="11" rx="3" />
          <rect x="187" y="48" width="72" height="11" rx="3" />
          <rect x="18" y="48" width="100" height="11" rx="3" />
          <rect x="0" y="71" width="37" height="11" rx="3" />
          <rect x="18" y="23" width="140" height="11" rx="3" />
          <rect x="166" y="23" width="173" height="11" rx="3" />
        </ContentLoader>
      )}
    </div>
  </div>
);

export default EmployeeLoader;
