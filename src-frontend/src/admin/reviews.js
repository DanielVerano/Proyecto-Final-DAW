import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  Create
} from 'react-admin'

export const ReviewList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="rating" />
      <TextField source="comment" />
      <TextField source="user" />
      <TextField source="product" />
    </Datagrid>
  </List>
);

export const ReviewEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="id" reference="reviews" />
      <TextInput source="rating" />
      <TextInput source="title" />
      <TextInput source="comment" />
      <TextInput source="user" />
      <TextInput source="product" />
    </SimpleForm>
  </Edit>
);

export const ReviewCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="rating" />
      <TextInput source="title" />
      <TextInput source="comment" />
      <TextInput source="user" />
      <TextInput source="product" />
    </SimpleForm>
  </Create>
);