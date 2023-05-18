import {
  Datagrid,
  EmailField,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  Create
} from 'react-admin'

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="surname" />
      <EmailField source="email" />
      <TextField source="role" />
      <TextField source="avatar" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="id" reference="users" />
      <TextInput source="name" />
      <TextInput source="surname" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="surname" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);