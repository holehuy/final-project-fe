import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ROLES } from 'shared/constants/common';
import { ENDPOINT } from 'shared/constants/endpoint';
import RouteCommon from 'routing/Route';
import MyProfile from 'containers/MyProfile';
import Employee from 'containers/EmployeePage';
import Evaluation from 'containers/EvaluationPage';
import DashBoardPage from 'containers/DashBoardPage';
import Examination from 'containers/ExaminationPage';
import NewEmployeePage from 'containers/EmployeePage/NewEmployee';
import EditEmployeePage from 'containers/EmployeePage/EditEmployee';
import EmployeeDetail from 'containers/EmployeePage/EmployeeDetail';
import EditMyProfile from 'containers/MyProfile/EditMyProfile';
import LoadingIndicator from 'components/LoadingIndicator';
const { ROUTING } = ENDPOINT;

function PrivateRoutes({ roles }) {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <RouteCommon
          path={ROUTING.DASHBOARD}
          component={DashBoardPage}
          roles={roles}
          requiredRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
        />
        <RouteCommon
          path={ROUTING.MY_PROFILE}
          component={MyProfile}
          roles={roles}
          requiredRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
        />
        <RouteCommon
          path={ROUTING.EDIT_MY_PROFILE}
          component={EditMyProfile}
          roles={roles}
          requiredRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
        />
        <RouteCommon
          path={ROUTING.EVALUATION}
          component={Evaluation}
          roles={roles}
          requiredRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
        />
        <RouteCommon
          path={ROUTING.EXAMINATION_LIST}
          component={Examination}
          roles={roles}
          requiredRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
        />
        <RouteCommon
          path={ROUTING.EMPLOYEE_LIST}
          component={Employee}
          roles={roles}
          requiredRoles={[ROLES.ADMIN]}
        />
        <RouteCommon
          path={ROUTING.EMPLOYEE_EDIT}
          component={EditEmployeePage}
          roles={roles}
          requiredRoles={[ROLES.ADMIN]}
        />
        <RouteCommon
          path={ROUTING.EMPLOYEE_DETAIL}
          component={EmployeeDetail}
          roles={roles}
          requiredRoles={[ROLES.ADMIN]}
        />
        <RouteCommon
          path={ROUTING.EMPLOYEE_NEW}
          component={NewEmployeePage}
          roles={roles}
          requiredRoles={[ROLES.ADMIN]}
        />

        <Redirect exact from={ROUTING.LOGIN_SUCCESS} to={ROUTING.DASHBOARD} />
        <Redirect exact from="/" to={ROUTING.DASHBOARD} />
        <Redirect to={ROUTING.ERROR_404} />
      </Switch>
    </Suspense>
  );
}

export default PrivateRoutes;
