import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";

import { StyledButton } from "../Button/Button.styled";

// Lift up all logic regarding the creating of the productData to the ./pages/index.js file.

// 💡 This includes the destructuring of const { mutate } = useSWR("/api/products");, the handleSubmit function and the import of useSWR.

export default function ProductForm({ onSubmit, isEditing, fishData }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledHeading>
        {isEditing ? "Edit Fish" : "Add a new Fish"}
      </StyledHeading>
      <StyledLabel htmlFor="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={fishData?.name}
        />
      </StyledLabel>
      <StyledLabel htmlFor="description">
        Description:
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={fishData?.description}
        />
      </StyledLabel>
      <StyledLabel htmlFor="price">
        Price:
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          defaultValue={fishData?.price}
        />
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        Currency:
        <select id="currency" name="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </StyledLabel>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}
