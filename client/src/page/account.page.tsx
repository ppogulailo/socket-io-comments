import { Button } from '../component/styled/atom/Button';
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/thunk/auth.thunk';
const AccountPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const logoutUser = async () => {
    dispatch(logout());
  };
  return (
    <div>
      <Button onClick={logoutUser}>Button</Button>
    </div>
  );
};

export default AccountPage;
