import React from 'react';
import ContentLoader from 'react-content-loader';

const EmployeeNewLoader = () => (
  <div className="col-12 new-employee-loading">
    <ContentLoader
      width={730}
      height={140}
      backgroundColor="#ffffff"
      foregroundColor="#bdb7b7"
    >
      <rect x="0" y="70" width="300" height="25" rx="3" />
    </ContentLoader>
    <ContentLoader viewBox="0 0 340 80" className="loader">
      <rect x="0" y="0" width="67" height="8" rx="3" />
      <rect x="76" y="0" width="140" height="8" rx="3" />
      <rect x="127" y="48" width="53" height="8" rx="3" />
      <rect x="187" y="48" width="72" height="8" rx="3" />
      <rect x="18" y="48" width="100" height="8" rx="3" />
      <rect x="0" y="71" width="37" height="8" rx="3" />
      <rect x="18" y="23" width="140" height="8" rx="3" />
      <rect x="166" y="23" width="173" height="8" rx="3" />
      <rect x="166" y="23" width="173" height="8" rx="3" />
      <rect x="200" y="70" width="72" height="8" rx="3" />
      <rect x="100" y="70" width="72" height="8" rx="3" />
      <rect x="200" y="90" width="90" height="8" rx="3" />
      <rect x="10" y="90" width="120" height="8" rx="3" />
    </ContentLoader>
  </div>
);

export default EmployeeNewLoader;
