import { useState, useEffect } from 'react';
// material
import { Container, Tab } from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { deleteUser, getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserList } from '../../components/_dashboard/user/list';
import UserCreateModal from './UserCreateModal';

export default function StudentList() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const { studentApprovedList, studentInProgressList } = useSelector(
    (state: RootState) => state.user
  );
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState('1');

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getUserList('inprogress', 'student'));
    dispatch(getUserList('approved', 'student'));
  }, [dispatch]);

  useEffect(() => {
    if (refresh) {
      dispatch(getUserList('inprogress', 'student'));
      dispatch(getUserList('approved', 'student'));
      setRefresh(false);
    }
  }, [refresh]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  return (
    <Page title="Students: List">
      <Container>
        <HeaderBreadcrumbs
          heading="Student List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Student List', href: PATH_DASHBOARD.student }
          ]}
          action={<UserCreateModal isEdit={false} currentUser={null} setRefresh={setRefresh} />}
        />
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="In-Progress" value="1" />
            <Tab label="Approved" value="2" />
          </TabList>
          <TabPanel value="1">
            <UserList
              type="student"
              handleRequestSort={handleRequestSort}
              handleClick={handleClick}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleFilterByName={handleFilterByName}
              handleDeleteUser={handleDeleteUser}
              page={page}
              setPage={setPage}
              order={order}
              selected={selected}
              orderBy={orderBy}
              filterName={filterName}
              rowsPerPage={rowsPerPage}
              userList={studentInProgressList}
              setRefresh={setRefresh}
            />
          </TabPanel>
          <TabPanel value="2">
            <UserList
              type="student"
              handleRequestSort={handleRequestSort}
              handleClick={handleClick}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleFilterByName={handleFilterByName}
              handleDeleteUser={handleDeleteUser}
              page={page}
              setPage={setPage}
              order={order}
              selected={selected}
              orderBy={orderBy}
              filterName={filterName}
              rowsPerPage={rowsPerPage}
              userList={studentApprovedList}
              setRefresh={setRefresh}
            />
          </TabPanel>
        </TabContext>
      </Container>
    </Page>
  );
}
