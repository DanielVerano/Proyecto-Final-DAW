import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  Create,
  useRecordContext
} from 'react-admin'

const StatusField = (props) => {
  const record = useRecordContext();

  return (
    <TextField
      sx={{ color: `${record.status === 'pendiente' ? 'red' : 'green'}` }}
      {...props} />
  )
}

export const OrderList = () => {

  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="total" />
        <StatusField source="status" />
        {/* <TextField source="cartItems" /> */}
        <TextField source="user" />
        <TextField source="clientSecret" />
      </Datagrid>
    </List>
  )
};

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="id" reference="orders" />
      <TextInput source="total" />
      <TextInput source="status" />
      {/* <TextInput source="cartItems" /> */}
      <TextInput source="user" />
      <TextInput source="clientSecret" />
    </SimpleForm>
  </Edit>
);

export const OrderCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="total" />
      <TextInput source="status" />
      <TextInput source="cartItems" />
      <TextInput source="user" />
      <TextInput source="clientSecret" />
    </SimpleForm>
  </Create>
);