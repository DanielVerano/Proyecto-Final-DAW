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

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="price" />
      {/* <TextField source="description" /> */}
      <TextField source="image" />
      <TextField source="category" />
      <TextField source="stock" />
      <TextField source="numOfReviews" />
      <TextField source="averageRating" />
    </Datagrid>
  </List>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="id" reference="products" />
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="category" />
      <TextInput source="stock" />
      <TextInput source="numOfReviews" />
      <TextInput source="averageRating" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="category" />
      <TextInput source="stock" />
      <TextInput source="numOfReviews" />
      <TextInput source="averageRating" />
    </SimpleForm>
  </Create>
);