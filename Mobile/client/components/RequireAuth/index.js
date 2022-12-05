import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();
	console.log(auth);
	return allowedRoles?.includes(auth?.role) ? (
		<Outlet />
	) : auth?.name ? (
		<Navigate
			to='/unauthorized'
			state={{ from: location }}
			replace
		/>
	) : (
		<Navigate
			to='/'
			state={{ from: location }}
			replace
		/>
	);
};

export default RequireAuth;
